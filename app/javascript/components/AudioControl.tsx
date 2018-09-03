import * as React from "react"
import AudioPlayer from './../model/AudioPlayer'
import Button from '@material-ui/core/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Stop from '@material-ui/icons/Stop';

interface AudioControlProps {
}

interface AudioControlState {
    changePlayStatus: number;
}

class AudioControl extends React.Component<AudioControlProps, AudioControlState> {
    private readonly bindPlay: () => void;
    private readonly bindPause: () => void;
    private readonly bindStop: () => void;
    private player: AudioPlayer;

    constructor(props: AudioControlProps) {
        super(props)

        this.state = {
            changePlayStatus: 0,
        }

        this.bindPlay = this.play.bind(this);
        this.bindPause = this.pause.bind(this);
        this.bindStop = this.stop.bind(this);
    }

    componentDidMount() {
        this.player = new AudioPlayer();
        this.player.didChangePlayStatus = this.didChangePlayStatus.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Button variant='outlined' onClick={this.bindPlay} style={{display: this.playButtonDisplay()}}><PlayArrow/></Button>
                    <Button variant='outlined' onClick={this.bindPause} style={{display: this.pauseButtonDisplay()}}><Pause/></Button>
                    <Button variant='outlined' onClick={this.bindStop}><Stop/></Button>
                </div>
            </React.Fragment>
        );
    }

    playButtonDisplay() {
        if (!this.player || !this.player.playing()) {
            return 'inline-block';
        } else {
            return 'none';
        }
    }

    pauseButtonDisplay() {
        if (this.player && this.player.playing()) {
            return 'inline-block';
        } else {
            return 'none';
        }
    }

    setSource(url: string) {
        this.player.setSource(url)
            .then((result) => {
                if (result) {
                    this.play();
                }
            });
    }

    play() {
        this.player.resume();
    }

    pause() {
        this.player.pause();
    }

    stop() {
        this.player.stop();
    }

    didChangePlayStatus() {
        this.setState({changePlayStatus: Math.random()});
    }
}

export default AudioControl;