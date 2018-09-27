import * as React from "react"

interface MixFaderProps {
    leftGainNode: GainNode,
    rightGainNode: GainNode,
}

interface MixFaderState {
    sliderValue: number;
}

class MixFader extends React.Component<MixFaderProps, MixFaderState> {
    private readonly bindOnSliderChange: (e: any) => void;
    private readonly faderMax: number;

    constructor(props: MixFaderProps) {
        super(props);

        this.bindOnSliderChange = this.onSliderChange.bind(this);
        this.faderMax = 100.0;

        this.state = {
            sliderValue: 50.0,
        };
    }

    componentDidMount() {
        this.updateVolume(this.state.sliderValue)
    }

    render() {
        return (
            <React.Fragment>
                <img src={'assets/mix_fader_bg.png'}
                     className={'mix_fader bg'}
                     draggable={false}/>
                <input type="range"
                       min="0"
                       max={this.faderMax}
                       value={this.state.sliderValue}
                       className="mix_fader input-range"
                       onChange={this.bindOnSliderChange}/>
            </React.Fragment>
        );
    }

    onSliderChange(e: React.FormEvent<HTMLInputElement>) {
        const value = parseFloat(e.currentTarget.value);
        this.updateVolume(value);
        this.setState({sliderValue: value});
    }

    updateVolume(value: number) {
        const rightGain = value / this.faderMax;
        const leftGain = 1.0 - rightGain;
        this.props.leftGainNode.gain.value = leftGain;
        this.props.rightGainNode.gain.value = rightGain;
    }
}

export default MixFader;
