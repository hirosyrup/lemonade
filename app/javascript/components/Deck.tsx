import * as React from "react"
import SongList from './SongList'
import Upload from './Upload'
import Turntable from "./Turntable";
import AudioControl from "./AudioControl";
import Knob from "./Knob";

interface DeckProps {
    uuid: string;
}

interface DeckState {
    listUpdate: number;
}

class Deck extends React.Component<DeckProps, DeckState> {
    private readonly bindDidUploaded: () => void;
    private readonly bindDidSelectSong: () => void;
    private readonly bindDidChangePlayStatus: (isPlaying: boolean) => void;
    private readonly bindDidUpdatePlaybackRate: (playbackRate: number, isReverse: boolean) => void;
    private bindAudioPlayerRef: AudioControl | null;
    private bindTurntableRef: Turntable | null;

    constructor(props: DeckProps) {
        super(props)
        this.bindDidUploaded = this.didUploaded.bind(this);
        this.bindDidSelectSong = this.didSelectSong.bind(this);
        this.bindDidChangePlayStatus = this.didChangePlayStatus.bind(this);
        this.bindDidUpdatePlaybackRate = this.didUpdatePlaybackRate.bind(this);
        this.bindAudioPlayerRef = null;
        this.bindTurntableRef = null;
    }

    render() {
        return (
            <React.Fragment>
                <div className='board-row'>
                    <Upload didUploaded={this.bindDidUploaded} uuid={this.props.uuid}/>
                    <SongList didSelectSong={this.bindDidSelectSong} uuid={this.props.uuid}/>
                    <Turntable ref={ref => this.bindTurntableRef = ref} didUpdatePlaybackRate={this.bindDidUpdatePlaybackRate}/>
                    <AudioControl ref={ref => this.bindAudioPlayerRef = ref} didChangePlayStatus={this.bindDidChangePlayStatus}/>
                    <Knob />
                </div>
            </React.Fragment>
        );
    }

    didUploaded() {
        this.setState({listUpdate: Math.random()});
    }

    didSelectSong(song: SongData) {
        if (this.bindAudioPlayerRef) {
            this.bindAudioPlayerRef.setSource(song.file_url);
        }
    }

    didChangePlayStatus(isPlaying: boolean) {
        if (!this.bindTurntableRef) return;

        this.bindTurntableRef.setAction(isPlaying);
    }

    didUpdatePlaybackRate(playbackRate: number, isReverse: boolean) {
        if (!this.bindAudioPlayerRef) return;
        this.bindAudioPlayerRef.setReverse(isReverse);
        this.bindAudioPlayerRef.setPlaybackRate(playbackRate);
    }
}

export default Deck;
