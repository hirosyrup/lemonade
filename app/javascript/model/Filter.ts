class Filter {
    readonly sourceNode: AudioNode;
    readonly destinationNode: AudioNode;
    readonly selfNode: AudioNode;

    private readonly filterNode: BiquadFilterNode;

    private filterEnabled: boolean;

    constructor(context: AudioContext, sourceNode: AudioNode, destinationNode: AudioNode) {
        this.sourceNode = sourceNode;
        this.destinationNode = destinationNode;
        this.filterNode = context.createBiquadFilter();
        this.selfNode = this.filterNode;
        this.filterNodeEnable(false);
    }

    filterNodeEnable(enable: boolean) {
        if (this.filterEnabled === enable) return;

        this.sourceNode.disconnect();
        this.filterNode.disconnect();

        if (enable) {
            this.sourceNode.connect(this.filterNode);
            this.filterNode.connect(this.destinationNode);
        } else {
            this.sourceNode.connect(this.destinationNode);
        }

        this.filterEnabled = enable;
    }

    setFrequency(frequency: number) {
        this.filterNode.frequency.value = frequency;
    }

    setQ(Q: number) {
        this.filterNode.Q.value = Q;
    }
}

export default Filter;