import AudioSource from "./AudioSource";
import EffectorSet from "./EffectorSet";

class AudioGraph {
    readonly audioSource: AudioSource;
    readonly effectorSet: EffectorSet;
    private readonly context: AudioContext;

    constructor() {
        const AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;
        this.context = new AudioContext();
        this.effectorSet = new EffectorSet(this.context);
        this.audioSource = new AudioSource(this.context, this.effectorSet.sourceNode);
        this.audioSource.didUpdateIsReverse = this.effectorSet.playTime.bindDidUpdateIsReverse;
        this.audioSource.didUpdateAudioBuffer = this.effectorSet.playTime.bindDidUpdateAudioBuffer;
        this.audioSource.didUpdatePlaybackRate = this.effectorSet.playTime.bindDidUpdatePlaybackRate;
        this.audioSource.addUpdatePlayStatusObserver(this.effectorSet.playTime.bindDidUpdatePlayStatus);
        this.audioSource.addUpdatePlayStatusObserver(this.effectorSet.level.bindDidUpdatePlayStatus);
        this.effectorSet.destinationNode.connect(this.context.destination);
    }
}

export default AudioGraph;
