import AudioSourceStatus from "./AudioSourceStatus";

class AudioSource {
    playEnded: (() => void) | null;
    didUpdateIsReverse: ((isReverse: boolean) => void) | null;
    didUpdateAudioBuffer: ((buffer: AudioBuffer) => void) | null;
    didUpdatePlayStatusList: Array<(status: AudioSourceStatus) => void>;
    didUpdatePlaybackRate: ((playbackRate: number) => void) | null;
    private source: AudioBufferSourceNode | null;
    private playStatus: AudioSourceStatus;
    private isReverse: boolean;
    private context: AudioContext;
    private audioBuffer: AudioBuffer | null;
    private reverseAudioBuffer: AudioBuffer | null;
    private currentPlayTime: number;
    private previousContextTime: number;
    private readonly destinationNode: AudioNode;

    constructor(context: AudioContext, destinationNode: AudioNode) {
        this.didUpdatePlayStatusList = [];
        this.playEnded = null;
        this.source = null;
        this.playStatus = AudioSourceStatus.stop;
        this.context = context;
        this.audioBuffer = null;
        this.reverseAudioBuffer = null;
        this.currentPlayTime = 0.0;
        this.destinationNode = destinationNode
        this.setupNode();
    }

    addUpdatePlayStatusObserver(observer: (status: AudioSourceStatus) => void) {
        this.didUpdatePlayStatusList.push(observer);
    }

    resume() {
        return new Promise((resolve) => {
            if (!this.source) {
                resolve(false);
            } else {
                this.start();
                this.context.resume()
                    .then(() => {
                        resolve(true);
                    });
            }
        });
    }

    pause() {
        return new Promise((resolve) => {
            this.updatePlayStatus(AudioSourceStatus.pause);
            this.context.suspend()
                .then(() => {
                    resolve();
                });
        });
    }

    start() {
        if (!this.audioBuffer) return;

        if (this.source && !this.source.buffer) {
            this.source.buffer = this.audioBuffer;
            this.previousContextTime = this.context.currentTime;
            this.source.start();
        }

        this.updatePlayStatus(AudioSourceStatus.play);
    }

    stop() {
        if (!this.source) return;
        if (!this.source.buffer) return;

        this.resetSourceConnect();
        this.updatePlayStatus(AudioSourceStatus.stop);
        this.isReverse = false;
        this.currentPlayTime = 0.0;
    }

    setReverse(isReverse: boolean) {
        if (!this.source) return;
        if (!this.audioBuffer) return;
        if (this.isReverse === isReverse) return;

        this.isReverse = isReverse;
        if (this.didUpdateIsReverse) {
            this.didUpdateIsReverse(isReverse);
        }

        this.resetSourceConnect();

        let startTime = 0.0;
        if (this.isReverse) {
            startTime = (this.audioBuffer.length / this.audioBuffer.sampleRate) - this.currentPlayTime;
            this.source.buffer = this.reverseAudioBuffer;
        } else {
            startTime = this.currentPlayTime;
            this.source.buffer = this.audioBuffer;
        }
        this.source.start(0, startTime);
    }

    setPlaybackRate(playbackRate: number) {
        if (!this.source) return;

        this.source.playbackRate.value = playbackRate;
        if (this.didUpdatePlaybackRate) {
            this.didUpdatePlaybackRate(playbackRate);
        }
    }

    setSource(url: string) {
        return new Promise((resolve) => {
            if (!url) {
                return resolve(false);
            }

            // for mobile
            this.context.createBufferSource().start();

            this.getAudioBuffer(url)
                .then((buffer: AudioBuffer) => {
                    this.resetSourceConnect();
                    this.updateAudioBuffer(buffer);
                    this.currentPlayTime = 0.0;
                    resolve(true)
                })
        });
    }

    resetSourceConnect() {
        if (this.source) {
            this.source.onended = null;
            if (this.source.buffer) {
                this.source.stop();
            }
            this.source.buffer = null;
            this.source.disconnect();
        }
        this.source = this.context.createBufferSource();
        this.source.connect(this.destinationNode );
        this.source.onended = this.onEnded.bind(this);
    }

    setupNode() {
        this.resetSourceConnect();
        setInterval(() => {
            this.updateTime();
        }, 10);
    }

    updateTime() {
        if (this.playStatus !== AudioSourceStatus.play) return;

        const current = this.context.currentTime;
        const diff = current - this.previousContextTime;
        if (this.isReverse) {
            this.currentPlayTime -= diff;
        } else {
            this.currentPlayTime += diff;
        }
        this.previousContextTime = current;
    }

    getAudioBuffer(url: string) {
        return new Promise((resolve) => {
            let req = new XMLHttpRequest();
            req.responseType = 'arraybuffer';
            req.onreadystatechange = (() => {
                if (req.readyState === 4) {
                    if (req.status === 0 || req.status === 200) {

                        this.context.decodeAudioData(req.response,
                            audioBuffer => {
                                resolve(audioBuffer);
                            },
                            error => {
                                console.error(error)
                            }
                        );
                    }
                }
            })
            req.open('GET', url, true);
            req.send();
        });
    }

    updateAudioBuffer(buffer: AudioBuffer) {
        this.audioBuffer = buffer
        this.reverseAudioBuffer = this.context.createBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
        for (let i = 0; i < buffer.numberOfChannels; ++i) {
            this.reverseAudioBuffer.copyToChannel(buffer.getChannelData(i), i, 0);
            Array.prototype.reverse.call( this.reverseAudioBuffer.getChannelData(i) );
        }

        if (this.didUpdateAudioBuffer) {
            this.didUpdateAudioBuffer(buffer);
        }
    }

    updatePlayStatus(status: AudioSourceStatus) {
        if (this.playStatus === status) return;

        this.playStatus = status;
        for(const i in this.didUpdatePlayStatusList) {
            this.didUpdatePlayStatusList[i](status);
        }
    }

    onEnded() {
        if (this.playEnded) {
            this.playEnded();
        }
    }
}

export default AudioSource;
