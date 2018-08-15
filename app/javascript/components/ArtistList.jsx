import React from "react"
import axios from "./AxiosDefault";
import List from './List'
import ListData from '../data/ListData'
import AlbumList from "./AlbumList";

class ArtistList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: [],
      selected_artist: null,
    }
    this.bindDidClickRow = this.didClickRow.bind(this);
  }

  componentWillMount() {
    this.fetch();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.selected_artist) {
      this.fetch();
    }
  }

  render() {
    return (
        <React.Fragment>
          {this.renderingList()}
        </React.Fragment>
    );
  }

  renderingList() {
    if (this.state.selected_artist) {
      return <AlbumList artist={this.state.selected_artist}/>;
    } else {
      return <List datas={this.createListData()} didClickRow={this.bindDidClickRow} />;
    }
  }

  fetch() {
    axios.get('music_player/songs', {
      params: {
        group_key: 'artist'
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
    return this.state.songs.map(s => new ListData(s.id, s.artist));
  }

  didClickRow(listData) {
    this.setState({selected_artist: listData.name});
  }
}

export default ArtistList