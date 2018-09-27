import * as React from "react"
import axios from "./AxiosDefault";
import Deck from './Deck';
import Grid from '@material-ui/core/Grid';
import Theme from './../model/theme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import AudioGraph from "../model/AudioGraph";
import Mixer from "./Mixer";

interface SystemProps {
}

interface SystemState {
    uuid: string | null;
}

class System extends React.Component<SystemProps, SystemState> {
    private readonly leftAudioGraph: AudioGraph;
    private readonly rightAudioGraph: AudioGraph;

    constructor(props: SystemProps) {
        super(props);
        this.state = {
            uuid: null,
        }

        this.leftAudioGraph = new AudioGraph();
        this.rightAudioGraph = new AudioGraph();
    }

    componentDidMount() {
        this.fetchUUID();
    }

    render() {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={Theme}>
                    <div className={'system root'}>
                        <Grid container>
                            <Grid item xs={4}>
                                {this.state.uuid &&
                                <Deck uuid={this.state.uuid} source={this.leftAudioGraph.audioSource}/>}
                            </Grid>
                            <Grid item xs={4}>
                                {this.state.uuid && <Mixer leftEffectorSet={this.leftAudioGraph.effectorSet} rightEffectorSet={this.rightAudioGraph.effectorSet}/>}
                            </Grid>
                            <Grid item xs={4}>
                                {this.state.uuid &&
                                <Deck uuid={this.state.uuid} source={this.rightAudioGraph.audioSource}/>}
                            </Grid>
                        </Grid>
                    </div>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }

    fetchUUID() {
        axios.get('music_player/uuid')
            .then((results) => {
                this.setState({uuid: results.data['uuid']});
            })
            .catch((data) => {
                console.log(data);
            });
    }
}

export default System;
