import * as React from "react"
import Turntable from "./Turntable";
import AudioControl from "./AudioControl";
import AudioSource from "../model/AudioSource";
import Grid from '@material-ui/core/Grid';
import SongLibrary from "./SongLibrary";
import TempoControl from "./TempoControl";


interface DeckProps {
    uuid: string,
    source: AudioSource,
    isLeftDeck: boolean,
}

interface DeckState {
    listUpdate: number,
}

class Deck extends React.Component<DeckProps, DeckState> {
    private readonly bindDidChangePlayStatus: (isPlaying: boolean) => void;
    private readonly bindDidUpdatePlaybackRate: (playbackRate: number, isReverse: boolean) => void;
    private readonly bindDidUploaded: () => void;
    private readonly bindDidSelectSong: (fileUrl: string) => void;
    private readonly bindDidUpdateTempoRate: (tempoRate: number) => void;
    private bindAudioControlRef: AudioControl | null;
    private bindTurntableRef: Turntable | null;

    constructor(props: DeckProps) {
        super(props)
        this.bindDidChangePlayStatus = this.didChangePlayStatus.bind(this);
        this.bindDidUpdatePlaybackRate = this.didUpdatePlaybackRate.bind(this);
        this.bindDidUploaded = this.didUploaded.bind(this);
        this.bindDidSelectSong = this.didSelectSong.bind(this);
        this.bindDidUpdateTempoRate = this.didUpdateTempoRate.bind(this);
        this.bindAudioControlRef = null;
        this.bindTurntableRef = null;
    }

    render() {
        return (
            <React.Fragment>
                <Grid container className={'deck turntable_div'}>
                    {this.props.isLeftDeck ? this.tempoControlLayout() : this.turntableLayout()}
                    {this.props.isLeftDeck ? this.turntableLayout() : this.tempoControlLayout()}
                    <SongLibrary didUploaded={this.bindDidUploaded}
                                 didSelectSong={this.bindDidSelectSong}
                                 buttonClass={this.props.isLeftDeck ? 'deck select_button_left' : 'deck select_button_right'}
                                 uuid={this.props.uuid}/>
                </Grid>
                <AudioControl ref={ref => this.bindAudioControlRef = ref}
                              didChangePlayStatus={this.bindDidChangePlayStatus}
                              source={this.props.source}/>
            </React.Fragment>
        );
    }

    turntableLayout() {
        return (
            <Grid item xs={10} className={this.props.isLeftDeck ? 'deck grid_item_turntable_left' : 'deck grid_item_turntable_right'}>
                <Turntable ref={ref => this.bindTurntableRef = ref} didUpdatePlaybackRate={this.bindDidUpdatePlaybackRate}/>
            </Grid>
        );
    }

    tempoControlLayout() {
        return (
            <Grid item xs={2}>
                <TempoControl didUpdateTempoRate={this.bindDidUpdateTempoRate}/>
            </Grid>
        );
    }

    didUploaded() {
        this.setState({listUpdate: Math.random()});
    }

    didSelectSong(fileUrl: string) {
        if (this.bindAudioControlRef) {
            this.bindAudioControlRef.setSource(fileUrl);
        }
    }

    didChangePlayStatus(isPlaying: boolean) {
        if (!this.bindTurntableRef) return;

        this.bindTurntableRef.setAction(isPlaying);
    }

    didUpdatePlaybackRate(playbackRate: number, isReverse: boolean) {
        if (!this.bindAudioControlRef) return;
        this.bindAudioControlRef.setReverse(isReverse);
        this.bindAudioControlRef.setPlaybackRate(playbackRate);
    }

    didUpdateTempoRate(tempoRate: number) {
        if (!this.bindTurntableRef) return;

        this.bindTurntableRef.setNormalPlaybackRate(tempoRate);
    }
}

export default Deck;
