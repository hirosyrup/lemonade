import React from "react"
import axios from "./AxiosDefault";
import List from './List'
import ListData from '../data/ListData'

class ArtistList extends React.Component {
  static propTypes = {
    didClickRow: PropTypes.func.isRequired,
    datas: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      songs: [],
    }
    this.bindDidClickRow = this.didClickRow.bind(this);
  }
  
  componentDidMount() {
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
  }
}

export default ArtistList