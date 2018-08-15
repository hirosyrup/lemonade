import React from "react"
import axios from "./AxiosDefault";
import List from './List'
import ListData from '../data/ListData'
import SongList from "./SongList";

class AlbumList extends React.Component {
  static propTypes = {
    artist: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      songs: [],
      selected_album: null,
    }
    this.bindDidClickRow = this.didClickRow.bind(this);
  }

  componentWillMount() {
    this.fetch();
  }

  render() {
    return (
        <React.Fragment>
          {this.renderingList()}
        </React.Fragment>
    );
  }

  renderingList() {
    if (this.state.selected_album) {
      return <SongList artist={this.props.artist} album={this.state.selected_album}/>;
    } else {
      return <List datas={this.createListData()} didClickRow={this.bindDidClickRow} />;
    }
  }

  fetch() {
    axios.get('music_player/songs', {
      params: {
        artist: this.props.artist,
        group_key: 'album'
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
    return this.state.songs.map(s => new ListData(s.id, s.album));
  }

  didClickRow(listData) {
    this.setState({selected_album: listData.name});
  }
}

export default AlbumList