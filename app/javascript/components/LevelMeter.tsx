import * as React from "react"
import Theme from './../model/theme'

interface LevelMeterProps {
    containerClassName: string,
}

interface LevelMeterState {
    level: number;
}

class LevelMeter extends React.Component<LevelMeterProps, LevelMeterState> {
    constructor(props: LevelMeterProps) {
        super(props);

        this.state = {
            level: 6,
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className={'level_meter root'}>
                    <div className={this.props.containerClassName}
                         style={{borderColor: Theme.palette.primary.dark}}>
                        {this.meterLayout(11)}
                        {this.meterLayout(10)}
                        {this.meterLayout(9)}
                        {this.meterLayout(8)}
                        {this.meterLayout(7)}
                        {this.meterLayout(6)}
                        {this.meterLayout(5)}
                        {this.meterLayout(4)}
                        {this.meterLayout(3)}
                        {this.meterLayout(2)}
                        {this.meterLayout(1)}
                        {this.meterLayout(0)}
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
}

export default LevelMeter;