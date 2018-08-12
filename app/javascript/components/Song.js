import React from "react"
import axios from './AxiosDefault'

class Song extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: [],
      indicator_display: 'none',
      layer: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  handleChange = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append('file',e.target.files[0]);

    this.showIndicator();
    axios.post('resources/songs/create', form)
    .then((results) => {
      console.log(results)
      this.fetch();
      this.hideIndicator();
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className='board-row'>
          <div className='scroll_box'>
            <ul>
              {this.state.songs.map((data) => {
                return <li key={this.listId(data)} onClick={() => this.handleListClick(this.listId(data))}>{this.listName(data)}</li>;
              })}
            </ul>
          </div>
          <input type='file' name='song' style={{display:'none'}} onChange={this.handleChange} />
          <div>
            <input type='button' value='ファイル選択' onClick={this.handleClick} />
            <img src='assets/indicator.gif' name='indicator' style={{display:this.state.indicator_display}} />
          </div>
        </div>
      </React.Fragment>
    );
  }

  fetch() {
    axios.get('music_player/songs')
        .then((results) => {
          console.log(results)
          this.setState({songs: results.data});
        })
        .catch((data) =>{
          console.log(data);
        })
  }

  listId(data) {
    switch (this.state.layer) {
      case 0:
        return data[0][0].id;
      case 1:
        return data[0].id;
      case 2:
        return data.id;
    }
  }

  listName(data) {
    switch (this.state.layer) {
      case 0:
        return data[0][0].artist;
      case 1:
        return data[0].album;
      case 2:
        return data.title;
    }
  }

  showIndicator() {
    this.setState({indicator_display: 'block'});
  }

  hideIndicator() {
    this.setState({indicator_display: 'none'});
  }

  handleClick() {
    document.getElementsByName("song")[0].click();
  }

  handleListClick(itemId) {
    var nextDatas = this.state.songs.find((song) => {return this.listId(song) === itemId})
    if (nextDatas) {
      this.setState(
          {
            songs: nextDatas,
            layer: this.state.layer + 1,
          }
      );
    }
  }
}

export default Song
