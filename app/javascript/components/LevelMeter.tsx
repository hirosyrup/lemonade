import * as React from "react"

interface LevelMeterProps {
    containerClassName: string,
}

interface LevelMeterState {
}

class LevelMeter extends React.Component<LevelMeterProps, LevelMeterState> {
    render() {
        return (
            <React.Fragment>
                <div className={'level_meter root'}>
                    <div className={this.props.containerClassName}></div>
                </div>
            </React.Fragment>
        );
    }
}

export default LevelMeter;