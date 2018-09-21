import AudioSource from "./AudioSource";
import MixerSet from "./MixerSet";

class AudioGraph {
    readonly audioSource: AudioSource;
    readonly mixerSet: MixerSet;
    private readonly context: AudioContext;

    constructor() {
        const AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;
        this.context = new AudioContext();
        this.mixerSet = new MixerSet(this.context);
        this.audioSource = new AudioSource(this.context, this.mixerSet.sourceNode);
        this.mixerSet.destinationNode.connect(this.context.destination);
    }
}

export default AudioGraph;
