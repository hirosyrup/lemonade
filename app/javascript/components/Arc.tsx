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

    constructor(props: ArcProps) {
        super(props)

        this.canvasId = Math.random().toString(36);
    }

    componentDidMount() {
        this.draw();
    }

    render() {
        return (
            <React.Fragment>
                <canvas id={this.canvasId} />
            </React.Fragment>
        );
    }

    draw() {
        const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
        const size = (this.props.center + this.props.lineWidth) * 2;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
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