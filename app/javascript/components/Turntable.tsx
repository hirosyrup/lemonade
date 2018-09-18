import * as React from "react"

interface TurntableProps {
}

interface TurntableState {
    rotate: number;
}

class Turntable extends React.Component<TurntableProps, TurntableState> {
    private readonly bindOnDrag: (e: any) => void;
    private readonly deltaCoef: number;

    constructor(props: TurntableProps) {
        super(props);

        this.bindOnDrag = this.onDrag.bind(this);
        this.deltaCoef = 0.5;
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
                     onWheel={this.bindOnDrag}/>
            </React.Fragment>
        );
    }

    onDrag(e: WheelEvent) {
        e.preventDefault();
        this.setState({rotate: this.state.rotate + e.deltaY * this.deltaCoef});
    }
}

export default Turntable;
