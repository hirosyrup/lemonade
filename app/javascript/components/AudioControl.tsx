import * as React from "react"
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Stop from '@material-ui/icons/Stop';
import AudioSource from "../model/AudioSource";

interface AudioControlProps {
    didChangePlayStatus: (isPlaying: boolean) => void,
    source: AudioSource,
}

interface AudioControlState {
    changePlayStatus: number;
}

class AudioControl extends React.Component<AudioControlProps, AudioControlState> {
    private readonly bindPlay: () => void;
    private readonly bindPause: () => void;
    private readonly bindStop: () => void;
    private readonly source: AudioSource;
    private playing: boolean;

    constructor(props: AudioControlProps) {
        super(props)

        this.state = {
            changePlayStatus: 0,
        }

        this.bindPlay = this.play.bind(this);
        this.bindPause = this.pause.bind(this);
        this.bindStop = this.stop.bind(this);
        this.source = this.props.source;
        this.source.playEnded = this.onEnded.bind(this);
        this.playing = false;
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Grid container>
                        <Grid item xs={6} className={'audio_control grid_item_left'}>
                            <Button variant='outlined'
                                    fullWidth={true}
                                    color={"primary"}
                                    style={{display: this.playButtonDisplay()}}
                                    className='audio_control button'
                                    onClick={this.bindPlay}><PlayArrow className={'audio_control button_font'}/></Button>
                            <Button variant='outlined'
                                    fullWidth={true}
                                    color={"primary"}
                                    className='audio_control button'
                                    style={{display: this.pauseButtonDisplay()}}
                                    onClick={this.bindPause}><Pause className={'audio_control button_font'}/></Button>
                        </Grid>
                        <Grid item xs={6} className={'audio_control grid_item_right'}>
                            <Button variant='outlined'
                                    fullWidth={true}
                                    color={"primary"}
                                    className='audio_control button'
                                    onClick={this.bindStop}><Stop className={'audio_control button_font'}/></Button>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }

    playButtonDisplay() {
        if (!this.playing) {
            return 'inline-flex';
        } else {
            return 'none';
        }
    }

    pauseButtonDisplay() {
        if (this.playing) {
            return 'inline-flex';
        } else {
            return 'none';
        }
    }

    setSource(url: string) {
        this.stop();
        this.source.setSource(url)
            .then((result) => {
                if (result) {
                    this.play();
                }
            });
    }

    play() {
        if (this.playing) return;

        this.source.resume()
            .then((result) => {
                if (result) {
                    this.changePlayingStatus(true);
                }
            });
    }

    pause() {
        if (!this.playing) return;

        this.source.pause()
            .then(() => {
            this.changePlayingStatus(false);
        });
    }

    stop() {
        if (!this.playing) return;

        this.source.stop();
        // If suspend immediately, an audio buffer queue will remain.
        setTimeout(() => {
            this.pause();
        }, 400);
    }

    setReverse(isReverse: boolean) {
        this.source.setReverse(isReverse);
    }

    setPlaybackRate(playbackRate: number) {
        this.source.setPlaybackRate(playbackRate);
    }

    changePlayingStatus(isPlay: boolean) {
        this.playing = isPlay;
        this.setState({changePlayStatus: Math.random()});
        this.props.didChangePlayStatus(this.playing);
    }

    onEnded() {
        this.stop();
    }
}

export default AudioControl;
