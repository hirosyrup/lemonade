import React from "react"
import axios from "./AxiosDefault";
import List from './List'
import ArtistListStrategy from "../model/strategy/ArtistListStrategy";
import AlbumListStrategy from "../model/strategy/AlbumListStrategy";
import SongListStrategy from "../model/strategy/SongListStrategy";

class SongList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      strategy: new ArtistListStrategy(),
      layer: 0,
    }
    this.bindDidClickRow = this.didClickRow.bind(this);
  }

  componentWillMount() {
    this.updateCurrent();
  }

  componentWillReceiveProps(nextProps) {
    this.updateCurrent();
  }

  render() {
    return (
        <React.Fragment>
          <List datas={this.state.strategy.createListData()} didClickRow={this.bindDidClickRow} />
        </React.Fragment>
    );
  }

  updateCurrent() {
    let strategy = this.state.strategy;
    this.fetch(strategy)
        .then((data) => {
          strategy.songs = data;
          this.setState({strategy: strategy});
        })
        .catch((data) =>{
        })
  }

  updateNext(selectedListData) {
    let strategy = null;
    let layer = null;
    switch (this.state.layer) {
      case 0:
        strategy = new AlbumListStrategy(selectedListData.name);
        layer = 1;
        break;
      case 1:
        strategy = new SongListStrategy(this.state.strategy.artistName, selectedListData.name),
        layer = 2;
        break;
      default:
        break;
    }

    if (strategy != null) {
      this.fetch(strategy)
          .then((data) => {
            strategy.songs = data;
            this.setState({strategy: strategy, layer: layer});
          })
          .catch((data) =>{
          })
    }
  }

  fetch(strategy) {
    return new Promise((resolve, reject) => {
      axios.get('music_player/songs', {
        params: strategy.createFetchParams()
      })
          .then((results) => {
            console.log(results)
            resolve(results.data);
          })
          .catch((data) => {
            console.log(data);
            reject(data);
          })
    });
  }

  didClickRow(listData) {
    this.updateNext(listData);
  }
}

export default SongList