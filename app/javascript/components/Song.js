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

  componentDidMount() {
    this.fetch();
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
        <div className='board-row'>
          <div className='scroll_box'>
            <ul>
              {this.state.songs.map((data) => {
                return <li key={data.id}>{data.title}</li>;
              })}
            </ul>
          </div>
          <input type='file' name='song' style={{display:'none'}} onChange={this.handleChange} />
          <input type='button' value='ファイル選択' onClick={this.handleClick} />
        </div>
      </React.Fragment>
    );
  }

  handleClick() {
    document.getElementsByName("song")[0].click();
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
