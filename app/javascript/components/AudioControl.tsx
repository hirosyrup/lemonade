import * as React from "react"
import AudioPlayer from './../model/AudioPlayer'

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
                    <input type='button' value='play' onClick={this.bindPlay}
                           style={{display: this.playButtonDisplay()}}/>
                    <input type='button' value='pause' onClick={this.bindPause}
                           style={{display: this.pauseButtonDisplay()}}/>
                    <input type='button' value='stop' onClick={this.bindStop}/>
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