class EffectorSet {
    readonly sourceNode: AudioNode;
    readonly destinationNode: AudioNode;

    readonly filterNode: BiquadFilterNode;
    readonly gainNode: GainNode;

    constructor(context: AudioContext) {
        this.filterNode = context.createBiquadFilter();
        this.gainNode = context.createGain();
        this.sourceNode = this.filterNode;
        this.destinationNode = this.gainNode;
        this.filterNode.frequency.value = 44100.0;
        this.filterNode.connect(this.gainNode);
    }
}

export default EffectorSet;
