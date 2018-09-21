class MixerSet {
    readonly sourceNode: AudioNode;
    readonly destinationNode: AudioNode;

    private readonly filterNode: BiquadFilterNode;
    private readonly gainNode: GainNode;

    constructor(context: AudioContext) {
        this.filterNode = context.createBiquadFilter();
        this.gainNode = context.createGain();
        this.sourceNode = this.filterNode;
        this.destinationNode = this.gainNode;
        this.filterNode.connect(this.gainNode);
    }
}

export default MixerSet;
