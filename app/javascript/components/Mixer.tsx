import * as React from "react"
import MixFader from "./MixFader";
import EffectorSet from "../model/EffectorSet";

interface MixerProps {
    leftEffectorSet: EffectorSet,
    rightEffectorSet: EffectorSet,
}

interface MixerState {
}

class Mixer extends React.Component<MixerProps, MixerState> {
    render() {
        return (
            <React.Fragment>
                <div className={'mixer root'}>
                    <div></div>
                    <div className={'mixer mix_fader'}>
                        <MixFader leftGainNode={this.props.leftEffectorSet.gainNode} rightGainNode={this.props.rightEffectorSet.gainNode}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Mixer;
