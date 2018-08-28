class AudioPlayer {
  constructor () {
    this.didChangePlayStatus = null;
    this.source = null;
    this.playing = false;
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.audioBuffer = null;
    this.setupNode();
  }

  resume() {
    if (this.playing) return;
    if (!this.audioBuffer) return;

    if (!this.source.buffer) {
      this.source.buffer = this.audioBuffer;
      this.source.start();
    }
    this.context.resume();
    this.changePlayingStatus(true);
  }

  pause() {
    if (!this.playing) return;
    if (!this.source.buffer) return;

    this.context.suspend()
        .then(() =>{
          this.changePlayingStatus(false);
        });
  }

  stop() {
    if (!this.source.buffer) return;

    this.resetSourceConnect();
  }

  setSource(url) {
    return new Promise((resolve) => {
      if (!url) {
        return resolve(false);
      }

      // for mobile
      this.context.createBufferSource().start();

      this.getAudioBuffer(url)
          .then((buffer) => {
            this.resetSourceConnect();
            this.audioBuffer = buffer;
            resolve(true)
          })
    });
  }

  resetSourceConnect() {
    if (this.source) {
      this.source.onended = null;
      if (this.source.buffer) {
        this.source.stop();
        this.changePlayingStatus(false);
      }
      this.source.buffer = null;
      this.source.disconnect();
    }
    this.source = this.context.createBufferSource();
    this.source.connect(this.context.destination);
    this.source.onended = this.onEnded.bind(this);
  }

  setupNode() {
    this.resetSourceConnect();
  }

  getAudioBuffer(url) {
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

  changePlayingStatus(isPlay) {
    this.playing = isPlay;
    if (this.didChangePlayStatus) {
      this.didChangePlayStatus();
    }
  }

  onEnded() {
    this.stop();
  }
}

export default AudioPlayer;