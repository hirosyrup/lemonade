import AudioContextBlinkStrategy from './strategy/AudioContextBlinkStrategy'

class AudioPlayer {
  constructor () {
    if (window.AudioContext) {
      this.strategy = new AudioContextBlinkStrategy();
    }
  }

  resume() {
    this.strategy.resume()
  }

  pause() {
    this.strategy.pause()
  }

  stop() {
    this.strategy.stop()
  }

  setSource(url) {
    return this.strategy.setSource(url);
  }

  setDidChangePlayStatus(callback) {
    this.strategy.didChangePlayStatus = callback;
  }

  playing() {
    return this.strategy.playing
  }
}

export default AudioPlayer;