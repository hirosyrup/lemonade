import AudioSource  from './AudioSource';

class AudioPlayer {
    didChangePlayStatus: (() => void) | null;
    private source: AudioSource;
    private _playing: boolean;
    private context: AudioContext;
    private isReverse: boolean;
    playing(): boolean { return this._playing; };

    constructor() {
        this.didChangePlayStatus = null;
        const AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;
        this.context = new AudioContext();
        this.source = new AudioSource(this.context, this.context.destination);
        this.source.plyaEnded = this.onEnded.bind(this);
        this._playing = false;
        this.isReverse = false;
    }

    resume() {
        if (this._playing) return;
        this.source.start();
        this.context.resume();
        this.changePlayingStatus(true);
    }

    pause() {
        if (!this._playing) return;

        this.context.suspend()
            .then(() => {
                this.changePlayingStatus(false);
            });
    }

    stop() {
        if (!this.source) return;

        this.source.stop();
        this.changePlayingStatus(false);
    }

    reverse() {
        if (!this.source) return;

        this.isReverse = !this.isReverse;
        this.source.setReverse(this.isReverse);
    }

    setSource(url: string) {
        return new Promise((resolve) => {
            this.source.setSource(url)
                .then((result) => {
                resolve(result);
            })
        });
    }

    changePlayingStatus(isPlay: boolean) {
        this._playing = isPlay;
        if (this.didChangePlayStatus) {
            this.didChangePlayStatus();
        }
    }

    onEnded() {
        this.stop();
    }
}

export default AudioPlayer;
