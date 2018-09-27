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
        this.effectorSet.destinationNode.connect(this.context.destination);
    }
}

export default AudioGraph;
