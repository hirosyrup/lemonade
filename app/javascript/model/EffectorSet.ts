import Filter from "./Filter";

class EffectorSet {
    readonly sourceNode: AudioNode;
    readonly destinationNode: AudioNode;

    readonly filter: Filter;
    readonly gainNode: GainNode;
    readonly scriptNode: ScriptProcessorNode;

    constructor(context: AudioContext) {
        this.gainNode = context.createGain();
        this.scriptNode = context.createScriptProcessor(4096, 1, 1)
        this.scriptNode.onaudioprocess = this.onAudioProcess.bind(this);
        this.filter = new Filter(context, this.gainNode, this.scriptNode);

        this.sourceNode = this.gainNode;
        this.destinationNode = this.scriptNode;
    }

    onAudioProcess(ev: AudioProcessingEvent) {
        let inputBuffer = ev.inputBuffer;
        let outputBuffer = ev.outputBuffer;
        for (let i = 0; i < outputBuffer.numberOfChannels; i++) {
            let inputData = inputBuffer.getChannelData(i);
            let outputData = outputBuffer.getChannelData(i);
            for (let j = 0; j < inputBuffer.length; j++) {
                outputData[j] = inputData[j];
            }
        }
    }
}

export default EffectorSet;
