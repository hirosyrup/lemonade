import * as React from "react"
import Switch from "./Switch";
import Knob from "./Knob";

interface LowpassFilterProps {
}

interface LowpassFilterState {
}

class LowpassFilter extends React.Component<LowpassFilterProps, LowpassFilterState> {
    private readonly bindDidChangeLPFSwitch: (isOn: boolean) => void;
    private readonly bindDidChangeFreq: (value: number) => void;
    private readonly bindDidChangeQ: (value: number) => void;

    constructor(props: LowpassFilterProps) {
        super(props);
        this.bindDidChangeLPFSwitch = this.didChangeLPFSwitch.bind(this);
        this.bindDidChangeFreq = this.didChangeFreq.bind(this);
        this.bindDidChangeQ = this.didChangeQ.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <div className={'lowpass_filter filter_freq_knob'}>
                    <Knob initialValue={0.5} title={'freq'} didChange={this.bindDidChangeFreq}/>
                </div>
                <div className={'lowpass_filter filter_q_knob'}>
                    <Knob initialValue={0.5} title={'Q'} didChange={this.bindDidChangeQ}/>
                </div>
                <div className={'lowpass_filter filter_switch'}>
                    <Switch title={'LPF'} didChange={this.bindDidChangeLPFSwitch}/>
                </div>
            </React.Fragment>
        );
    }

    didChangeLPFSwitch(isOn: boolean) {
        console.log(isOn);
    }

    didChangeFreq(value: number) {
        console.log(value);
    }

    didChangeQ(value: number) {
        console.log(value);
    }
}

export default LowpassFilter;
