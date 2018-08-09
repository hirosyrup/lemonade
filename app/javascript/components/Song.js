import React from "react"
import axios from './AxiosDefault'

class Song extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append('file',e.target.files[0]);

    axios.post('resources/songs/create', form)
    .then((results) => {
      console.log(results)
      this.fetch();
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="board-row">
          {this.state.songs.length > 0 && this.state.songs[0].title}
          <button onClick={this.onclick.bind(this)}>テストボタン</button>

          <label>選択</label>
          <input type="file" name="song" onChange={this.handleChange} />
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
