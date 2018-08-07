import React from "react"
import axios from 'axios'

class Song extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: []
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="board-row">
          {this.state.songs.length > 0 && this.state.songs[0].title}
          <button onClick={this.onclick.bind(this)}>テストボタン</button>
        </div>
      </React.Fragment>
    );
  }

  onclick() {
    this.fetch();
  }

  fetch() {
    axios.get('resources/songs/index')
        .then((results) => {
          console.log(results)
          this.setState({songs: results.data})
        })
        .catch((data) =>{
          console.log(data)
        })
  }
}

export default Song
