import React from "react"

class AudioPlayer extends React.Component {
  componentDidMount() {
    this.context = new window.AudioContext();
    this.source = this.context.createBufferSource();
    this.source.connect(this.context.destination);
  }

  render() {
    return (
        <React.Fragment>
          <div></div>
        </React.Fragment>
    );
  }

  play(url) {
    if (!url) return;

    this.getAudioBuffer(url)
        .then((buffer) => {
          if (this.source.buffer) {
            this.source.stop();
            this.source.buffer = null;
            this.source.disconnect();
            this.source = this.context.createBufferSource();
            this.source.connect(this.context.destination);
          }
          this.source.buffer = buffer;
          this.source.start(0);
        })
  }

  getAudioBuffer(url) {
    return new Promise((resolve) => {
      let req = new XMLHttpRequest();
      req.responseType = 'arraybuffer';
      req.onreadystatechange = (() => {
        if (req.readyState === 4) {
          if (req.status === 0 || req.status === 200) {
            this.context.decodeAudioData(req.response)
                .then((buffer) => {
                  resolve(buffer);
                });
          }
        }
      })
      req.open('GET', url, true);
      req.send();
    });
  }
}

export default AudioPlayer