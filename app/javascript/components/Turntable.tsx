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

    constructor(props: TurntableProps) {
        super(props);

        this.bindOnWheel = this.onWheel.bind(this);
        this.deltaCoef = 0.06;
        this.playbackCoef = 0.4;
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
            this.props.didUpdatePlaybackRate(1.0, false);
        }, 20);
    }

    onWheel(e: WheelEvent) {
        e.preventDefault();
        if (!this.inAction) return;
        const angle = -e.deltaY * this.deltaCoef;
        this.setState({rotate: this.state.rotate + angle});
        this.updateRotation();
        const playbackRateWithCoef = Math.log(Math.abs(angle * this.playbackCoef) + 1.0);
        this.props.didUpdatePlaybackRate(Math.min(Math.max(playbackRateWithCoef, 0.25), 4.0), angle < 0);
    }
}

export default Turntable;
