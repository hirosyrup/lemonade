import AudioSourceStatus from "./AudioSourceStatus";

class PlayTime {
    didUpdateCurrentPlayTime: ((playTime: number) => void) | null;
    readonly selfNode: AudioNode;
    readonly bindDidUpdateIsReverse: ((isReverse: boolean) => void);
    readonly bindDidUpdateAudioBuffer: ((buffer: AudioBuffer) => void);
    readonly bindDidUpdatePlayStatus: ((status: AudioSourceStatus) => void);
    readonly bindDidUpdatePlaybackRate: ((playbackRate: number) => void) | null;

    private readonly scriptNode: ScriptProcessorNode;

    private samplingRate: number;
    private totalLength: number;
    private currentSampleNum: number;

    private isReverse: boolean;
    private playStatus: AudioSourceStatus;
    private playbackRate: number;

    constructor(context: AudioContext) {
        this.bindDidUpdateIsReverse = this.didUpdateIsReverse.bind(this);
        this.bindDidUpdateAudioBuffer = this.didUpdateAudioBuffer.bind(this);
        this.bindDidUpdatePlayStatus = this.didUpdatePlayStatus.bind(this);
        this.bindDidUpdatePlaybackRate = this.didUpdatePlaybackRate.bind(this);
        this.scriptNode = context.createScriptProcessor(4096, 1, 1)
        this.scriptNode.onaudioprocess = this.onAudioProcess.bind(this);
        this.selfNode = this.scriptNode;

        this.samplingRate = 44100.0;
        this.totalLength = 0.0;
        this.currentSampleNum = 0.0;
        this.playStatus = AudioSourceStatus.stop;
        this.playbackRate = 1.0;
    }

    resetSampleParams(samplingRate: number, totalLength: number) {
        this.samplingRate = samplingRate;
        this.totalLength = totalLength;
        this.currentSampleNum = 0.0;
    }

    didUpdateIsReverse(isReverse: boolean) {
        this.isReverse = isReverse;
    }

    didUpdateAudioBuffer(buffer: AudioBuffer) {
        this.resetSampleParams(buffer.sampleRate, buffer.length);
    }

    didUpdatePlayStatus(status: AudioSourceStatus) {
        this.playStatus = status;
        if (status === AudioSourceStatus.stop) {
            this.currentSampleNum = 0;
            this.updateCurrentPlayTime();
        }
    }

    didUpdatePlaybackRate(playbackRate: number) {
        this.playbackRate = playbackRate;
    }

    onAudioProcess(ev: AudioProcessingEvent) {
        let inputBuffer = ev.inputBuffer;
        let outputBuffer = ev.outputBuffer;

        if (this.playStatus === AudioSourceStatus.play) {
            const sampleNum = this.isReverse ? -inputBuffer.length : inputBuffer.length;
            this.currentSampleNum += (sampleNum * this.playbackRate);
            this.currentSampleNum = Math.max(Math.min(this.currentSampleNum, this.totalLength), 0);
            this.updateCurrentPlayTime();
        }
        for (let i = 0; i < outputBuffer.numberOfChannels; i=(i+1)|0) {
            let inputData = inputBuffer.getChannelData(i);
            let outputData = outputBuffer.getChannelData(i);
            for (let j = 0; j < inputBuffer.length; j++) {
                outputData[j] = inputData[j];
            }
        }
    }

    updateCurrentPlayTime() {
        if (this.didUpdateCurrentPlayTime) {
            const second = this.currentSampleNum / this.samplingRate;
            this.didUpdateCurrentPlayTime(second);
        }
    }
}

export default PlayTime;