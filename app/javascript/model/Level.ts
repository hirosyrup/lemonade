class Level {
    didUpdateLevel: ((level: number) => void) | null;
    readonly selfNode: AudioNode;

    private readonly scriptNode: ScriptProcessorNode;


    constructor(context: AudioContext) {
        this.scriptNode = context.createScriptProcessor(4096, 1, 1)
        this.scriptNode.onaudioprocess = this.onAudioProcess.bind(this);
        this.selfNode = this.scriptNode;
    }

    onAudioProcess(ev: AudioProcessingEvent) {
        let inputBuffer = ev.inputBuffer;
        let outputBuffer = ev.outputBuffer;

        let rms = 0.0;
        for (let j = 0; j < inputBuffer.length; j = (j + 1) | 0) {
            let average = 0.0;
            for (let i = 0; i < outputBuffer.numberOfChannels; i = (i + 1) | 0) {
                let inputData = inputBuffer.getChannelData(i);
                average += inputData[j];
            }
            average = average / outputBuffer.numberOfChannels;
            rms = rms + average * average;
        }
        rms = rms / inputBuffer.length;
        if (rms === 0.0) {
            rms = -1000.0;
        } else {
            rms = 10 * Math.log10(Math.sqrt(rms));
        }
        this.notifyUpdateLevel(rms);

        for (let i = 0; i < outputBuffer.numberOfChannels; i = (i + 1) | 0) {
            let inputData = inputBuffer.getChannelData(i);
            let outputData = outputBuffer.getChannelData(i);
            for (let j = 0; j < inputBuffer.length; j = (j + 1) | 0) {
                outputData[j] = inputData[j];
            }
        }
    }

    notifyUpdateLevel(level: number) {
        if (this.didUpdateLevel) {
            this.didUpdateLevel(level);
        }
    }
}

export default Level;
