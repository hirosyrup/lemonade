import * as React from "react"

interface MixFaderProps {
}

interface MixFaderState {
    sliderValue: number;
}

class MixFader extends React.Component<MixFaderProps, MixFaderState> {
    private readonly bindOnSliderChange: (e: any) => void;

    constructor(props: MixFaderProps) {
        super(props);

        this.bindOnSliderChange = this.onSliderChange.bind(this);

        this.state = {
            sliderValue: 50.0,
        };
    }

    render() {
        return (
            <React.Fragment>
                <img src={'assets/mix_fader_bg.png'}
                     className={'mix_fader bg'}
                     draggable={false}/>
                <input type="range"
                       min="0"
                       max="100"
                       value={this.state.sliderValue}
                       className="mix_fader input-range"
                       onChange={this.bindOnSliderChange}/>
            </React.Fragment>
        );
    }

    onSliderChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({sliderValue: parseFloat(e.currentTarget.value)});
    }
}

export default MixFader;