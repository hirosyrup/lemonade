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
    this.bindDidClickBack = this.didClickBack.bind(this);
  }

  componentWillMount() {
    this.updateCurrentList();
  }

  componentWillReceiveProps(nextProps) {
    this.updateCurrentList();
  }

  render() {
    return (
        <React.Fragment>
          <input type='button' value='戻る' onClick={this.bindDidClickBack} />
          <List datas={this.state.strategy.createListData()} didClickRow={this.bindDidClickRow} />
        </React.Fragment>
    );
  }

  updateCurrentList() {
    this.updateList(this.state.strategy, this.state.layer)
  }

  updateList(strategy, layer) {
    this.fetch(strategy)
        .then((data) => {
          strategy.songs = data;
          this.setState({strategy: strategy, layer: layer});
        })
        .catch((data) =>{
        })
  }

  toNextList(selectedListData) {
    let strategy = null;
    let layer = null;
    switch (this.state.layer) {
      case 0:
        strategy = new AlbumListStrategy(selectedListData.name);
        layer = 1;
        break;
      case 1:
        strategy = new SongListStrategy(this.state.strategy.artistName, selectedListData.name);
        layer = 2;
        break;
      default:
        break;
    }

    if (strategy != null) {
      this.updateList(strategy, layer);
    }
  }

  toPreviousList() {
    let strategy = null;
    let layer = null;
    switch (this.state.layer) {
      case 1:
        strategy = new ArtistListStrategy();
        layer = 0;
        break;
      case 2:
        strategy = new AlbumListStrategy(this.state.strategy.artistName);
        layer = 1;
        break;
      default:
        break;
    }

    if (strategy != null) {
      this.updateList(strategy, layer);
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
    this.toNextList(listData);
  }

  didClickBack() {
    this.toPreviousList();
  }
}

export default SongList