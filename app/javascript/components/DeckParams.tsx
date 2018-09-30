import * as React from "react"
import Switch from "./Switch";
import Knob from "./Knob";

interface DeckParamsProps {
}

interface DeckParamsState {
}

class DeckParams extends React.Component<DeckParamsProps, DeckParamsState> {
    private readonly bindDidChangeLPFSwitch: (isOn: boolean) => void;
    private readonly bindDidChangeFreq: (value: number) => void;
    private readonly bindDidChangeQ: (value: number) => void;

    constructor(props: DeckParamsProps) {
        super(props);
        this.bindDidChangeLPFSwitch = this.didChangeLPFSwitch.bind(this);
        this.bindDidChangeFreq = this.didChangeFreq.bind(this);
        this.bindDidChangeQ = this.didChangeQ.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <div className={'deck_params filter_freq_knob'}>
                    <Knob initialValue={0.5} title={'freq'} didChange={this.bindDidChangeFreq}/>
                </div>
                <div className={'deck_params filter_q_knob'}>
                    <Knob initialValue={0.5} title={'Q'} didChange={this.bindDidChangeQ}/>
                </div>
                <div className={'deck_params filter_switch'}>
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

export default DeckParams;