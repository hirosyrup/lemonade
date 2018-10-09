import * as React from "react"
import Theme from './../model/theme'
import Level from "../model/Level";

interface LevelMeterProps {
    containerClassName: string,
    level: Level,
}

interface LevelMeterState {
    level: number;
}

class LevelMeter extends React.Component<LevelMeterProps, LevelMeterState> {
    constructor(props: LevelMeterProps) {
        super(props);

        this.props.level.didUpdateLevel = this.didUpdateLevel.bind(this);

        this.state = {
            level: -70,
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className={'level_meter root'}>
                    <div className={this.props.containerClassName}
                         style={{borderColor: Theme.palette.primary.dark}}>
                        {this.meterLayout(0)}
                        {this.meterLayout(-3)}
                        {this.meterLayout(-6)}
                        {this.meterLayout(-9)}
                        {this.meterLayout(-12)}
                        {this.meterLayout(-15)}
                        {this.meterLayout(-18)}
                        {this.meterLayout(-30)}
                        {this.meterLayout(-40)}
                        {this.meterLayout(-50)}
                        {this.meterLayout(-60)}
                        {this.meterLayout(-70)}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    meterLayout(value: number) {
        return (
            <div className={'level_meter meter'}
                 style={{
                     opacity: this.state.level <= value ? 0.3 : 1.0,
                     backgroundColor: Theme.palette.primary.main
                 }}/>
        );
    }

    didUpdateLevel(level: number) {
        if (this.state.level === level) return;
        console.log(level);
        this.setState({level: level});
    }
}

export default LevelMeter;
