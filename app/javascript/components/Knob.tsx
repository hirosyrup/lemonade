import * as React from "react"
import Arc from "./Arc"
import Theme from './../model/theme'

interface KnobProps {
    initialValue: number;
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
    private readonly bindDidDrag: (e: any) => void;
    private readonly bindDidDragStart: (e: any) => void;
    private dragStartY: number;

    constructor(props: KnobProps) {
        super(props);

        this.lineWidth = 1.3;
        this.startAngle = 125;
        this.endAngle = 415;
        this.outsideRadius = 40;
        this.insideRadius = 14;
        this.innerRadiusOffset = 4.6;
        this.innerAngleOffset = 9;
        this.gaugeMax = 290;
        this.bindDidDrag = this.onDrag.bind(this);
        this.bindDidDragStart = this.onDragStart.bind(this);
        this.dragStartY = 0.0;

        this.state = {
            currentValue: this.props.initialValue,
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='knob arc_position'>
                    <Arc lineWidth={this.lineWidth}
                         strokeStyle={Theme.palette.primary.main}
                         fillStyle={null}
                         outsideRadius={this.outsideRadius}
                         insideRadius={this.insideRadius}
                         startAngle={this.startAngle}
                         endAngle={this.endAngle}
                         center={this.outsideRadius}/>
                </div>
                <div className='knob arc_position gauge_placeholder'>
                    <Arc lineWidth={this.lineWidth}
                         strokeStyle={Theme.palette.primary.main}
                         fillStyle={Theme.palette.primary.main}
                         outsideRadius={this.outsideRadius - this.innerRadiusOffset}
                         insideRadius={this.insideRadius + this.innerRadiusOffset}
                         startAngle={this.startAngle + this.innerAngleOffset}
                         endAngle={this.startAngle + this.gaugeMax - this.innerAngleOffset}
                         center={this.outsideRadius} />
                </div>
                <div className='knob arc_position' onDrag={this.bindDidDrag} onDragStart={this.bindDidDragStart} >
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

    onDrag(e: DragEvent) {
        const diff = e.screenY - this.dragStartY;
        this.setState({currentValue: diff * 0.1});
    }

    onDragStart(e: DragEvent) {
        this.dragStartY = e.screenY;
    }
}

export default Knob;
