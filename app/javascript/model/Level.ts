import AudioSourceStatus from "./AudioSourceStatus";

class Level {
    didUpdateLevel: ((level: number) => void) | null;
    readonly selfNode: AudioNode;

    private readonly scriptNode: ScriptProcessorNode;
    private readonly minRms: number;
    private readonly calcSampleNum: number;
    private readonly updateFrameNum: number;
    private  currentFrameNum: number;
    readonly bindDidUpdatePlayStatus: ((status: AudioSourceStatus) => void);

    constructor(context: AudioContext) {
        this.scriptNode = context.createScriptProcessor(512, 2, 2);
        this.scriptNode.onaudioprocess = this.onAudioProcess.bind(this);
        this.selfNode = this.scriptNode;
        this.minRms = -1000.0;
        this.calcSampleNum = 10.0;
        this.updateFrameNum = 8;
        this.currentFrameNum = 0;
        this.bindDidUpdatePlayStatus = this.didUpdatePlayStatus.bind(this);
    }

    onAudioProcess(ev: AudioProcessingEvent) {
        let inputBuffer = ev.inputBuffer;
        let outputBuffer = ev.outputBuffer;

        if (this.currentFrameNum === 0) {
            let rms = 0.0;
            for (let j = 0; j < this.calcSampleNum; j = (j + 1) | 0) {
                let average = 0.0;
                for (let i = 0; i < inputBuffer.numberOfChannels; i = (i + 1) | 0) {
                    let inputData = inputBuffer.getChannelData(i);
                    average += inputData[j];
                }
                average = average / inputBuffer.numberOfChannels;
                rms = rms + average * average;
            }
            rms = rms / this.calcSampleNum;
            if (rms === 0.0) {
                rms = this.minRms;
            } else {
                rms = 10 * Math.log10(Math.sqrt(rms));
            }
            this.notifyUpdateLevel(rms);
        }
        this.currentFrameNum += 1;
        this.currentFrameNum %= this.updateFrameNum;

        for (let i = 0; i < outputBuffer.numberOfChannels; i = (i + 1) | 0) {
            let inputData = inputBuffer.getChannelData(i);
            let outputData = outputBuffer.getChannelData(i);
            outputData.set(inputData);
        }
    }

    notifyUpdateLevel(level: number) {
        if (this.didUpdateLevel) {
            this.didUpdateLevel(level);
        }
    }

    didUpdatePlayStatus(status: AudioSourceStatus) {
        if (status === AudioSourceStatus.pause) {
            this.notifyUpdateLevel(this.minRms);
        }
    }
}

export default Level;
