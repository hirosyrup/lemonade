import * as React from "react"

interface TurntableProps {
}

interface TurntableState {
    rotate: number;
}

class Turntable extends React.Component<TurntableProps, TurntableState> {
    private readonly bindOnWheel: (e: any) => void;
    private readonly deltaCoef: number;
    private inAction: boolean;
    private timer: number | NodeJS.Timer | null;

    constructor(props: TurntableProps) {
        super(props);

        this.bindOnWheel = this.onWheel.bind(this);
        this.deltaCoef = 0.5;
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
        }, 20);
    }

    onWheel(e: WheelEvent) {
        e.preventDefault();
        if (!this.inAction) return;
        this.setState({rotate: this.state.rotate + e.deltaY * this.deltaCoef});
        this.updateRotation();
    }
}

export default Turntable;
