import React from "react"
import SongList from './SongList'
import Upload from './Upload'

class Deck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listUpdate: 0,
    }
    this.bindDidUploaded = this.didUploaded.bind(this);
    this.bindDidSelectSong = this.didSelectSong.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <div className='board-row'>
          <SongList didSelectSong={this.bindDidSelectSong}/>
          <Upload didUploaded={this.bindDidUploaded}/>
        </div>
      </React.Fragment>
    );
  }

  didUploaded() {
    this.setState({ listUpdate: Math.random() });
  }

  didSelectSong(song) {
  }
}

export default Deck
