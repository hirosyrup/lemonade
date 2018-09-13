import * as React from "react"
import SongList from './SongList'
import Upload from './Upload'
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
    private bindAudioPlayerRef: AudioControl | null;

    constructor(props: DeckProps) {
        super(props)
        this.bindDidUploaded = this.didUploaded.bind(this);
        this.bindDidSelectSong = this.didSelectSong.bind(this);
        this.bindAudioPlayerRef = null;
    }

    render() {
        return (
            <React.Fragment>
                <div className='board-row'>
                    <Upload didUploaded={this.bindDidUploaded} uuid={this.props.uuid}/>
                    <SongList didSelectSong={this.bindDidSelectSong} uuid={this.props.uuid}/>
                    <AudioControl ref={ref => this.bindAudioPlayerRef = ref}/>
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
}

export default Deck;
