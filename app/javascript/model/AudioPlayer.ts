import AudioSource  from './AudioSource';

class AudioPlayer {
    didChangePlayStatus: (() => void) | null;
    private source: AudioSource;
    private _playing: boolean;
    private context: AudioContext;
    playing(): boolean { return this._playing; };
    private sin: number[];
    private timer: NodeJS.Timer | number | undefined;
    private currentIndex: number;

    constructor() {
        this.didChangePlayStatus = null;
        const AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;
        this.context = new AudioContext();
        this.source = new AudioSource(this.context, this.context.destination);
        this.source.plyaEnded = this.onEnded.bind(this);
        this._playing = false;
        this.sin = [0,
            -0.1253332336,
            -0.2486898872,
            -0.3681245527,
            -0.4817536741,
            -0.5877852523,
            -0.6845471059,
            -0.7705132428,
            -0.8443279255,
            -0.9048270525,
            -0.9510565163,
            -0.9822872507,
            -0.9980267284,
            -0.9980267284,
            -0.9822872507,
            -0.9510565163,
            -0.9048270525,
            -0.8443279255,
            -0.7705132428,
            -0.6845471059,
            -0.5877852523,
            -0.4817536741,
            -0.3681245527,
            -0.2486898872,
            -0.1253332336,
            0,
            0.1253332336,
            0.2486898872,
            0.3681245527,
            0.4817536741,
            0.5877852523,
            0.6845471059,
            0.7705132428,
            0.8443279255,
            0.9048270525,
            0.9510565163,
            0.9822872507,
            0.9980267284,
            0.9980267284,
            0.9822872507,
            0.9510565163,
            0.9048270525,
            0.8443279255,
            0.7705132428,
            0.6845471059,
            0.5877852523,
            0.4817536741,
            0.3681245527,
            0.2486898872,
            0.1253332336,
            0,
            -0.1253332336,
            -0.2486898872,
            -0.3681245527,
            -0.4817536741,
            -0.5877852523,
            -0.6845471059,
            -0.7705132428,
            -0.8443279255,
            -0.9048270525,
            -0.9510565163,
            -0.9822872507,
            -0.9980267284,
            -0.9980267284,
            -0.9822872507,
            -0.9510565163,
            -0.9048270525,
            -0.8443279255,
            -0.7705132428,
            -0.6845471059,
            -0.5877852523,
            -0.4817536741,
            -0.3681245527,
            -0.2486898872,
            -0.1253332336,
            0,
            0.1253332336,
            0.2486898872,
            0.3681245527,
            0.4817536741,
            0.5877852523,
            0.6845471059,
            0.7705132428,
            0.8443279255,
            0.9048270525,
            0.9510565163,
            0.9822872507,
            0.9980267284,
            0.9980267284,
            0.9822872507,
            0.9510565163,
            0.9048270525,
            0.8443279255,
            0.7705132428,
            0.6845471059,
            0.5877852523,
            0.4817536741,
            0.3681245527,
            0.2486898872,
            0.1253332336];
        this.timer = undefined;
        this.currentIndex = 0;
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
        if (this.timer !== undefined) return;

        this.timer = setInterval(() => {
            this.updatePitch();
        }, 10);
    }

    updatePitch() {
        const value = this.sin[this.currentIndex];
        const isReverse = value < 0;
        this.source.setReverse(isReverse);
        const pitch = (1.0 - Math.abs(value)) + 0.5;
        this.source.setPlaybackRate(pitch);

        ++this.currentIndex;

        if (this.sin.length == this.currentIndex) {
            this.currentIndex = 0;
            clearInterval(this.timer);
            this.source.setReverse(false);
            this.source.setPlaybackRate(1.0);
            this.timer = undefined;
        }
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
