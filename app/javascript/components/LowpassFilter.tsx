import * as React from "react"
import Switch from "./Switch";
import Knob from "./Knob";
import Filter from "../model/Filter";

interface LowpassFilterProps {
    filter: Filter,
}

interface LowpassFilterState {
}

class LowpassFilter extends React.Component<LowpassFilterProps, LowpassFilterState> {
    private readonly bindDidChangeFreq: (value: number) => void;
    private readonly bindDidChangeQ: (value: number) => void;
    private readonly bindDidUpdateSwitch: (isOn: boolean) => void;

    constructor(props: LowpassFilterProps) {
        super(props);
        this.bindDidChangeFreq = this.didChangeFreq.bind(this);
        this.bindDidChangeQ = this.didChangeQ.bind(this);
        this.bindDidUpdateSwitch = this.didUpdateSwitch.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <div className={'lowpass_filter filter_freq_knob'}>
                    <Knob initialValue={0.6} title={'freq'} didChange={this.bindDidChangeFreq}/>
                </div>
                <div className={'lowpass_filter filter_q_knob'}>
                    <Knob initialValue={0.53} title={'Q'} didChange={this.bindDidChangeQ}/>
                </div>
                <div className={'lowpass_filter filter_switch'}>
                    <Switch title={'LPF'} didChange={this.bindDidUpdateSwitch}/>
                </div>
            </React.Fragment>
        );
    }

    didChangeFreq(value: number) {
        const freq = Math.pow(10, (value * 3.0) + 1) * 2.0;
        this.props.filter.setFrequency(freq);
    }

    didChangeQ(value: number) {
        const q = value * 19.0 + 1.0;
        this.props.filter.setQ(q);
    }

    didUpdateSwitch(isOn: boolean) {
        this.props.filter.filterNodeEnable(isOn);
    }
}

export default LowpassFilter;
