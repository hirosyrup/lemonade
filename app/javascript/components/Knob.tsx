import * as React from "react"
import Arc from "./Arc"
import Theme from './../model/theme'
import Typography from '@material-ui/core/Typography';

interface KnobProps {
    initialValue: number;
    title: string;
    didChange: (value: number) => void;
}


interface KnobState {
    currentValue: number;
}

class Knob extends React.Component<KnobProps, KnobState> {
    private readonly lineWidth: number;
    private readonly startAngle: number;
    private readonly endAngle: number;
    private readonly outsideRadius: number;
    private readonly insideRadius: number;
    private readonly innerRadiusOffset: number;
    private readonly innerAngleOffset: number;
    private readonly gaugeMax: number;
    private readonly minValue: number;
    private readonly bindOnWheel: (e: any) => void;
    private readonly bindOnMouseMove: (e: any) => void;
    private readonly bindOnMouseDown: (e: any) => void;
    private readonly bindOnMouseUp: () => void;
    private readonly bindOnMouseOut: () => void;
    private prevStartY: number;
    private isMousePressed: boolean;
    private readonly width: number;

    constructor(props: KnobProps) {
        super(props);

        this.lineWidth = 1.3;
        this.startAngle = 125;
        this.endAngle = 415;
        this.outsideRadius = 36;
        this.insideRadius = 14;
        this.innerRadiusOffset = 4.6;
        this.innerAngleOffset = 9;
        this.gaugeMax = 290;
        this.minValue = (2.0 * this.innerAngleOffset) / this.gaugeMax;
        this.bindOnWheel = this.onWheel.bind(this);
        this.bindOnMouseMove = this.onMouseMove.bind(this);
        this.bindOnMouseDown = this.onMouseDown.bind(this);
        this.bindOnMouseUp = this.onMouseUp.bind(this);
        this.bindOnMouseOut = this.onMouseOut.bind(this);
        this.prevStartY = 0.0;
        this.isMousePressed = false;
        this.width = (this.lineWidth + this.outsideRadius) * 2.0;

        this.state = {
            currentValue: this.props.initialValue,
        }
    }

    componentDidMount() {
        this.props.didChange(this.state.currentValue);
    }

    render() {
        return (
            <React.Fragment>
                <div className='knob arc_position' style={{maxWidth: this.width}}>
                    <Arc lineWidth={this.lineWidth}
                         strokeStyle={Theme.palette.primary.main}
                         fillStyle={null}
                         outsideRadius={this.outsideRadius}
                         insideRadius={this.insideRadius}
                         startAngle={this.startAngle}
                         endAngle={this.endAngle}
                         center={this.outsideRadius}/>
                    <Typography color={'primary'}
                        className='knob title'>
                        {this.props.title}
                    </Typography>
                </div>
                <div className='knob arc_position gauge_placeholder' style={{maxWidth: this.width}}>
                    <Arc lineWidth={this.lineWidth}
                         strokeStyle={Theme.palette.primary.main}
                         fillStyle={Theme.palette.primary.main}
                         outsideRadius={this.outsideRadius - this.innerRadiusOffset}
                         insideRadius={this.insideRadius + this.innerRadiusOffset}
                         startAngle={this.startAngle + this.innerAngleOffset}
                         endAngle={this.startAngle + this.gaugeMax - this.innerAngleOffset}
                         center={this.outsideRadius} />
                </div>
                <div className='knob arc_position'
                     style={{maxWidth: this.width}}
                     onWheel={this.bindOnWheel}
                     onMouseDown={this.bindOnMouseDown}
                     onMouseMove={this.bindOnMouseMove}
                     onMouseUp={this.bindOnMouseUp}
                     onMouseOut={this.bindOnMouseOut}>
                    <Arc lineWidth={this.lineWidth}
                         strokeStyle={Theme.palette.primary.main}
                         fillStyle={Theme.palette.primary.main}
                         outsideRadius={this.outsideRadius - this.innerRadiusOffset}
                         insideRadius={this.insideRadius + this.innerRadiusOffset}
                         startAngle={this.startAngle + this.innerAngleOffset}
                         endAngle={this.startAngle + this.gaugeMax * this.state.currentValue - this.innerAngleOffset}
                         center={this.outsideRadius} />
                </div>
            </React.Fragment>
        );
    }

    onWheel(e: WheelEvent) {
        e.preventDefault();
        this.updateCurrentValue(-e.deltaY * 0.3);
    }

    onMouseMove(e: MouseEvent) {
        if (!this.isMousePressed) return;

        const diff = this.prevStartY - e.screenY;
        this.prevStartY = e.screenY;
        this.updateCurrentValue(diff);
    }

    onMouseDown(e: MouseEvent) {
        this.isMousePressed = true;
        this.prevStartY = e.screenY;
    }

    onMouseUp() {
        this.isMousePressed = false;
    }

    onMouseOut() {
        this.isMousePressed = false;
    }

    updateCurrentValue(diffPos: number) {
        let newCurrentValue = this.state.currentValue + diffPos * 0.015;
        newCurrentValue = Math.max(Math.min(newCurrentValue, 1.0), this.minValue);
        const notifyValue = newCurrentValue === this.minValue ? 0 : newCurrentValue;
        if (this.state.currentValue !== newCurrentValue) {
            this.setState({currentValue: newCurrentValue});
            this.props.didChange(notifyValue);
        }
    }
}

export default Knob;
