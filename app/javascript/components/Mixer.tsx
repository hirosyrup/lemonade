import * as React from "react"
import MixFader from "./MixFader";
import EffectorSet from "../model/EffectorSet";
import Grid from '@material-ui/core/Grid';
import DeckParams from "./DeckParams";

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
                    <Grid container
                          className={'mixer deck_params_container'}>
                        <Grid item xs={6}>
                            <DeckParams isLeftDeckParams={true} didUpdateLowpassSwitch={this.didUpdateLeftLowpassSwitch.bind(this)}/>
                        </Grid>
                        <Grid item xs={6}>
                            <DeckParams isLeftDeckParams={false} didUpdateLowpassSwitch={this.didUpdateRightLowpassSwitch.bind(this)}/>
                        </Grid>
                    </Grid>
                    <div className={'mixer mix_fader'}>
                        <MixFader leftGainNode={this.props.leftEffectorSet.gainNode} rightGainNode={this.props.rightEffectorSet.gainNode}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    didUpdateLeftLowpassSwitch(isOn: boolean) {
        this.props.leftEffectorSet.filterNodeEnable(isOn, 1000.0, 10.0);
    }

    didUpdateRightLowpassSwitch(isOn: boolean) {
        this.props.rightEffectorSet.filterNodeEnable(isOn, 1000.0, 10.0);
    }
}

export default Mixer;
