import * as React from "react"

interface TurntableProps {
    didUpdatePlaybackRate: (playbackRate: number, isReverse: boolean) => void,
}

interface TurntableState {
    rotate: number;
}

class Turntable extends React.Component<TurntableProps, TurntableState> {
    private readonly bindOnWheel: (e: any) => void;
    private readonly deltaCoef: number;
    private readonly playbackCoef: number;
    private inAction: boolean;
    private timer: number | NodeJS.Timer | null;
    private previousDiffAngle: number;

    constructor(props: TurntableProps) {
        super(props);

        this.bindOnWheel = this.onWheel.bind(this);
        this.deltaCoef = 0.5;
        this.playbackCoef = 0.05;
        this.inAction = false;
        this.timer = null;
        this.state = {
            rotate: 0,
        }
    }

    render() {
        return (
            <React.Fragment>
                <img src={'assets/turntable.png'}
                     className={'turntable img'}
                     style={{transform: "rotate(" + this.state.rotate +"deg)"}}
                     draggable={false}
                     onWheel={this.bindOnWheel}/>
            </React.Fragment>
        );
    }

    setAction(action: boolean) {
        if (this.inAction === action) return;
        this.inAction = action;
        if (this.inAction) {
            this.updateRotation();
        }
    }

    updateRotation() {
        if (!this.inAction) return;

        if (this.timer) {
            clearTimeout(this.timer as number);
        }
        this.timer = setTimeout(() => {
            this.setState({rotate: this.state.rotate + 2});
            this.updateRotation();
            this.previousDiffAngle = 0.0;
            this.props.didUpdatePlaybackRate(1.0, false);
        }, 20);
    }

    onWheel(e: WheelEvent) {
        e.preventDefault();
        if (!this.inAction) return;
        const diff = e.deltaY * this.deltaCoef;
        this.setState({rotate: this.state.rotate + diff});
        this.updateRotation();
        const playbackRate = Math.abs(diff * 0.15 + this.previousDiffAngle * 0.85); // 慣性をつける
        this.props.didUpdatePlaybackRate(playbackRate * this.playbackCoef, diff < 0);
        this.previousDiffAngle = diff;
    }
}

export default Turntable;
