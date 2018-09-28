import * as React from "react"
import Button from '@material-ui/core/Button';
import MusicNote from '@material-ui/icons/MusicNote';
import Slide from '@material-ui/core/Slide';
import SongList from './SongList'
import Upload from './Upload'
import Theme from './../model/theme'

interface SongLibraryProps {
    didUploaded: () => void,
    didSelectSong: (fileUrl: string) => void,
    buttonClass: string,
    uuid: string,
}

interface SongLibraryState {
    showSelect: boolean,
}

class SongLibrary extends React.Component<SongLibraryProps, SongLibraryState> {
    private readonly bindDidUploaded: () => void;
    private readonly bindDidSelectSong: () => void;
    private readonly bindSelectButton: () => void;
    private readonly bindCloseButton: () => void;

    constructor(props: SongLibraryProps) {
        super(props)
        this.bindDidUploaded = this.didUploaded.bind(this);
        this.bindDidSelectSong = this.didSelectSong.bind(this);
        this.bindSelectButton = this.onSelect.bind(this);
        this.bindCloseButton = this.onClose.bind(this);

        this.state = {
            showSelect: false,
        }
    }

    render() {
        return (
            <React.Fragment>
                <Button variant='outlined'
                        color={"primary"}
                        className={this.props.buttonClass}
                        onClick={this.bindSelectButton}>
                    <MusicNote className='sound_library select_button_font'/>
                </Button>
                <Slide direction="up"
                       in={this.state.showSelect}
                       mountOnEnter
                       unmountOnExit
                       style={{borderColor: Theme.palette.primary.dark}}>
                    <div className='sound_library song_list'>
                        <div className='sound_library header'>
                            <Button variant='outlined'
                                    color={"primary"}
                                    className={'sound_library close_button'}
                                    onClick={this.bindCloseButton}>aaa</Button>
                            <Upload didUploaded={this.bindDidUploaded}
                                    uuid={this.props.uuid}
                                    buttonClass={'sound_library upload_button'}/>
                        </div>
                        <SongList didSelectSong={this.bindDidSelectSong} uuid={this.props.uuid}/>
                    </div>
                </Slide>
            </React.Fragment>
        );
    }

    didUploaded() {
        this.props.didUploaded();
    }

    didSelectSong(song: SongData) {
        this.props.didSelectSong(song.file_url);
    }

    onSelect() {
        this.setState({showSelect: true});
    }

    onClose() {
        this.setState({showSelect: false});
    }
}

export default SongLibrary;
