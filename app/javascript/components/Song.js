import React from "react"
import axios from './AxiosDefault'

class Song extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: [],
      indicator_display: 'none'
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
                return <li key={data.id}>{data.title}</li>;
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

  handleClick() {
    document.getElementsByName("song")[0].click();
  }

  fetch() {
    axios.get('resources/songs/index')
        .then((results) => {
          console.log(results)
          this.setState({songs: results.data});
        })
        .catch((data) =>{
          console.log(data);
        })
  }

  showIndicator() {
    this.setState({indicator_display: 'block'});
  }

  hideIndicator() {
    this.setState({indicator_display: 'none'});
  }
}

export default Song
