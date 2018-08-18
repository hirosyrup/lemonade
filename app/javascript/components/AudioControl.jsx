import React from "react"
import AudioPlayer from './../model/AudioPlayer'

class AudioControl extends React.Component {
  componentDidMount() {
    this.player = new AudioPlayer();
  }

  render() {
    return (
        <React.Fragment>
          <div>
          </div>
        </React.Fragment>
    );
  }

  play(url) {
    this.player.play(url);
  }
}

export default AudioControl;