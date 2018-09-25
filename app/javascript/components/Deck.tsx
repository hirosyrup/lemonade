import * as React from "react"
import SongList from './SongList'
import Upload from './Upload'
import Turntable from "./Turntable";
import AudioControl from "./AudioControl";
import AudioSource from "../model/AudioSource";
import Grid from '@material-ui/core/Grid';

interface DeckProps {
    uuid: string,
    source: AudioSource,
}

interface DeckState {
    listUpdate: number,
}

class Deck extends React.Component<DeckProps, DeckState> {
    private readonly bindDidUploaded: () => void;
    private readonly bindDidSelectSong: () => void;
    private readonly bindDidChangePlayStatus: (isPlaying: boolean) => void;
    private readonly bindDidUpdatePlaybackRate: (playbackRate: number, isReverse: boolean) => void;
    private bindAudioControlRef: AudioControl | null;
    private bindTurntableRef: Turntable | null;

    constructor(props: DeckProps) {
        super(props)
        this.bindDidUploaded = this.didUploaded.bind(this);
        this.bindDidSelectSong = this.didSelectSong.bind(this);
        this.bindDidChangePlayStatus = this.didChangePlayStatus.bind(this);
        this.bindDidUpdatePlaybackRate = this.didUpdatePlaybackRate.bind(this);
        this.bindAudioControlRef = null;
        this.bindTurntableRef = null;
    }

    render() {
        return (
            <React.Fragment>
                <div className='board-row'>
                    <Upload didUploaded={this.bindDidUploaded} uuid={this.props.uuid}/>
                    <SongList didSelectSong={this.bindDidSelectSong} uuid={this.props.uuid}/>
                    <Grid container className={'deck turntable_div'}>
                        <Grid item xs={10} className={'deck grid_item_turntable'}>
                            <Turntable ref={ref => this.bindTurntableRef = ref} didUpdatePlaybackRate={this.bindDidUpdatePlaybackRate}/>
                        </Grid>
                        <Grid item xs={2} className={'deck grid_item_speed_fader'}>
                            <div></div>
                        </Grid>
                    </Grid>
                    <AudioControl ref={ref => this.bindAudioControlRef = ref}
                                  didChangePlayStatus={this.bindDidChangePlayStatus}
                                  source={this.props.source}/>
                </div>
            </React.Fragment>
        );
    }

    didUploaded() {
        this.setState({listUpdate: Math.random()});
    }

    didSelectSong(song: SongData) {
        if (this.bindAudioControlRef) {
            this.bindAudioControlRef.setSource(song.file_url);
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
}

export default Deck;
