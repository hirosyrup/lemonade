import * as React from "react"
import AudioPlayer from './../model/AudioPlayer'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Stop from '@material-ui/icons/Stop';

interface AudioControlProps {
    didChangePlayStatus: (isPlaying: boolean) => void,
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
                    <Grid container spacing={16}>
                        <Grid item xs={8}>
                            <Button variant='outlined'
                                    fullWidth={true}
                                    color={"primary"}
                                    style={{display: this.playButtonDisplay()}}
                                    className='audio_control button'
                                    onClick={this.bindPlay}><PlayArrow/></Button>
                            <Button variant='outlined'
                                    fullWidth={true}
                                    color={"primary"}
                                    className='audio_control button'
                                    style={{display: this.pauseButtonDisplay()}}
                                    onClick={this.bindPause}><Pause/></Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined'
                                    fullWidth={true}
                                    color={"primary"}
                                    className='audio_control button'
                                    onClick={this.bindStop}><Stop/></Button>
                        </Grid>
                    </Grid>
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
        this.stop();
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

    setReverse(isReverse: boolean) {
        this.player.setReverse(isReverse);
    }

    setPlaybackRate(playbackRate: number) {
        this.player.setPlaybackRate(playbackRate);
    }

    didChangePlayStatus() {
        this.setState({changePlayStatus: Math.random()});
        this.props.didChangePlayStatus(this.player.playing());
    }
}

export default AudioControl;
