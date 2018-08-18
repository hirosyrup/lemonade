import React from "react"
import axios from './AxiosDefault'
import SongList from './SongList'

class Deck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      indicator_display: 'none',
    }
    this.bindHandleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append('file',e.target.files[0]);

    this.showIndicator();
    axios.post('resources/songs/create', form)
    .then((results) => {
      console.log(results)
      this.hideIndicator();
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className='board-row'>
          <SongList/>
          <input type='file' name='song' style={{display:'none'}} onChange={this.bindHandleChange} />
          <div>
            <input type='button' value='ファイル選択' onClick={this.handleClick} />
            <img src='assets/indicator.gif' name='indicator' style={{display:this.state.indicator_display}} />
          </div>
        </div>
      </React.Fragment>
    );
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
}

export default Deck
