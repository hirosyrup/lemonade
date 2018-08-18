import ListData from "../data/ListData";

class ArtistListStrategy {
  constructor () {
    this.songs = [];
  }

  createFetchParams() {
    return {
      group_key: 'artist',
    };
  }

  createListData() {
    return this.songs.map(s => new ListData(s.id, s.artist));
  }

  title() {
    return 'Artists';
  }
}

export default ArtistListStrategy