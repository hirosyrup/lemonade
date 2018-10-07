class EffectorSet {
    readonly sourceNode: AudioNode;
    readonly destinationNode: AudioNode;

    readonly filterNode: BiquadFilterNode;
    readonly gainNode: GainNode;
    readonly scriptNode: ScriptProcessorNode;

    private filterEnabled: boolean;

    constructor(context: AudioContext) {
        this.filterNode = context.createBiquadFilter();
        this.gainNode = context.createGain();
        this.scriptNode = context.createScriptProcessor(4096, 1, 1)
        this.scriptNode.onaudioprocess = this.onAudioProcess.bind(this);

        this.sourceNode = this.gainNode;
        this.destinationNode = this.scriptNode;
        this.filterNode.frequency.value = 44100.0;
        this.gainNode.connect(this.filterNode);
        this.filterNode.connect(this.scriptNode);
        this.filterEnabled = true;
    }

    filterNodeEnable(enable: boolean, frequency: number, q: number) {
        if (this.filterEnabled === enable) return;

        this.gainNode.disconnect();
        this.filterNode.disconnect();

        if (enable) {
            this.gainNode.connect(this.filterNode);
            this.filterNode.connect(this.scriptNode);
            this.filterNode.frequency.value = frequency;
            this.filterNode.Q.value = q;
        } else {
            this.gainNode.connect(this.scriptNode);
        }

        this.filterEnabled = enable;
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
