import React from "react"
import axios from "./AxiosDefault";
import List from './List'
import ListData from '../model/data/ListData'

class SongList extends React.Component {
  static propTypes = {
    artist: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      songs: [],
    }
    this.bindDidClickRow = this.didClickRow.bind(this);
  }

  componentWillMount() {
    this.fetch();
  }

  componentWillReceiveProps(nextProps) {
    this.fetch();
  }

  render() {
    return (
        <React.Fragment>
          <List datas={this.createListData()} didClickRow={this.bindDidClickRow} />
        </React.Fragment>
    );
  }

  fetch() {
    axios.get('music_player/songs', {
      params: {
        artist: this.props.artist,
        album: this.props.album
      }
    })
        .then((results) => {
          console.log(results)
          this.setState({songs: results.data});
        })
        .catch((data) =>{
          console.log(data);
        })
  }

  createListData() {
    return this.state.songs.map(s => new ListData(s.id, s.title));
  }

  didClickRow(listData) {
  }
}

export default SongList