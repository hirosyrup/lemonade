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
                            <DeckParams isLeftDeckParams={true} filter={this.props.leftEffectorSet.filter} playTime={this.props.leftEffectorSet.playTime}/>
                        </Grid>
                        <Grid item xs={6}>
                            <DeckParams isLeftDeckParams={false} filter={this.props.rightEffectorSet.filter} playTime={this.props.rightEffectorSet.playTime}/>
                        </Grid>
                    </Grid>
                    <div className={'mixer mix_fader'}>
                        <MixFader leftGainNode={this.props.leftEffectorSet.gainNode} rightGainNode={this.props.rightEffectorSet.gainNode}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Mixer;
