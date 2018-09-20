import * as React from "react"

interface ArcProps {
    lineWidth: number,
    fillStyle: string | null,
    strokeStyle: string | null,
    outsideRadius: number,
    insideRadius: number,
    startAngle: number,
    endAngle: number,
    center: number,
}


interface ArcState {
}

class Arc extends React.Component<ArcProps, ArcState> {
    private readonly canvasId: string;
    private readonly size: number;
    private readonly styleSize: number;

    constructor(props: ArcProps) {
        super(props)

        this.canvasId = Math.random().toString(36);
        this.styleSize = (this.props.center + this.props.lineWidth) * 2;
        this.size = this.styleSize * 2; // for Retina
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    render() {
        return (
            <React.Fragment>
                <canvas id={this.canvasId}
                        className='arc canvas'/>
            </React.Fragment>
        );
    }

    draw() {
        const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;

        canvas.width = this.size;
        canvas.height = this.size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (this.props.startAngle === this.props.endAngle) return;

            ctx.scale(2.0, 2.0); // for Retina
            ctx.lineWidth = this.props.lineWidth;
            if (this.props.fillStyle) {ctx.fillStyle = this.props.fillStyle;}
            if (this.props.strokeStyle) {ctx.strokeStyle = this.props.strokeStyle;}

            ctx.beginPath();
            const startRad = this.getRad(this.props.startAngle);
            const endRad = this.getRad(this.props.endAngle);
            const posRad = this.getRad(360 - this.props.startAngle);
            const center = this.props.lineWidth + this.props.center;
            const endX = this.props.outsideRadius * Math.cos(posRad) + center;
            const endY = this.props.outsideRadius * -Math.sin(posRad) + center;
            ctx.arc(center, center, this.props.outsideRadius, startRad, endRad, false);
            ctx.arc(center, center, this.props.insideRadius, endRad, startRad, true);
            ctx.lineTo(endX, endY);
            if (this.props.fillStyle) {ctx.fill();}
            ctx.stroke();
        }
    }

    getRad(num: number) {
        return num * Math.PI / 180;
    }
}

export default Arc;