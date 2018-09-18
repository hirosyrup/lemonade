import * as React from "react"

interface TurntableProps {
}

interface TurntableState {
    rotate: number;
}

class Turntable extends React.Component<TurntableProps, TurntableState> {
    private readonly bindOnWheel: (e: any) => void;
    private readonly deltaCoef: number;
    private isWheel: boolean;
    private timer: NodeJS.Timer | null;

    constructor(props: TurntableProps) {
        super(props);

        this.bindOnWheel = this.onWheel.bind(this);
        this.deltaCoef = 0.5;
        this.isWheel = false;
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

    updateRotation() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.setState({rotate: this.state.rotate + 2});
            this.updateRotation();
        }, 20);
    }

    onWheel(e: WheelEvent) {
        e.preventDefault();
        this.setState({rotate: this.state.rotate + e.deltaY * this.deltaCoef});
        this.updateRotation();
    }
}

export default Turntable;
