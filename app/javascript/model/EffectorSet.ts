import Filter from "./Filter";
import PlayTime from "./PlayTime";
import Level from "./Level";

class EffectorSet {
    readonly sourceNode: AudioNode;
    readonly destinationNode: AudioNode;

    readonly filter: Filter;
    readonly gainNode: GainNode;
    readonly playTime: PlayTime;
    readonly level: Level;

    constructor(context: AudioContext) {
        this.gainNode = context.createGain();

        this.playTime = new PlayTime(context);
        this.level = new Level(context);
        this.filter = new Filter(context, this.playTime.selfNode, this.level.selfNode);
        this.level.selfNode.connect(this.gainNode);

        this.sourceNode = this.playTime.selfNode;
        this.destinationNode = this.gainNode;
    }
}

export default EffectorSet;
