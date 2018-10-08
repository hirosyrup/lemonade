import Filter from "./Filter";
import PlayTime from "./PlayTime";

class EffectorSet {
    readonly sourceNode: AudioNode;
    readonly destinationNode: AudioNode;

    readonly filter: Filter;
    readonly gainNode: GainNode;
    readonly playTime: PlayTime;

    constructor(context: AudioContext) {
        this.gainNode = context.createGain();

        this.playTime = new PlayTime(context);
        this.filter = new Filter(context, this.playTime.selfNode, this.gainNode);

        this.sourceNode = this.playTime.selfNode;
        this.destinationNode = this.gainNode;
    }
}

export default EffectorSet;
