import React from "react"
import axios from "./AxiosDefault";
import List from './List'
import ArtistListStrategy from "../model/strategy/ArtistListStrategy";
import AlbumListStrategy from "../model/strategy/AlbumListStrategy";
import SongListStrategy from "../model/strategy/SongListStrategy";

class SongList extends React.Component {
  static propTypes = {
    didSelectSong: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
  };

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
          <input type='button' value='戻る' onClick={this.bindDidClickBack} style={{visibility: this.backButtonHidden()}}/>
          <div className='scroll_box'>
            <List datas={this.state.strategy.createListData()} didClickRow={this.bindDidClickRow}/>
          </div>
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

  isLast() {
    return this.state.layer === 2;
  }

  backButtonHidden() {
    if (this.state.layer === 0) {
      return 'hidden';
    } else {
      return 'visible';
    }
  }

  songAt(id) {
    return this.state.strategy.songs.find((song) => {
      return song.id === id;
    });
  }

  fetch(strategy) {
    return new Promise((resolve, reject) => {
      let params = strategy.createFetchParams();
      params['uuid'] = this.props.uuid;
      axios.get('music_player/songs', {
        params: params
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
    if (this.isLast()) {
      this.props.didSelectSong(this.songAt(listData.id));
    } else {
      this.toNextList(listData);
    }
  }

  didClickBack() {
    this.toPreviousList();
  }
}

export default SongList;