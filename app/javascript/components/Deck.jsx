import React from "react"
import SongList from './SongList'
import Upload from './Upload'
import AudioPlayer from "./AudioPlayer";

class Deck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listUpdate: 0,
    }
    this.bindDidUploaded = this.didUploaded.bind(this);
    this.bindDidSelectSong = this.didSelectSong.bind(this);
    this.bindAudioPlayerRef = null;
  }

  render() {
    return (
      <React.Fragment>
        <div className='board-row'>
          <SongList didSelectSong={this.bindDidSelectSong}/>
          <Upload didUploaded={this.bindDidUploaded}/>
          <AudioPlayer ref={ref => this.bindAudioPlayerRef = ref}/>
        </div>
      </React.Fragment>
    );
  }

  didUploaded() {
    this.setState({ listUpdate: Math.random() });
  }

  didSelectSong(song) {
    this.bindAudioPlayerRef.play(song.file.url);
  }
}

export default Deck
