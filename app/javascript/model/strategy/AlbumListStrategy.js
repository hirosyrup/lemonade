import ListData from "../data/ListData";

class AlbumListStrategy {
  constructor (artistName) {
    this.songs = [];
    this.artistName = artistName;
  }

  createFetchParams() {
    return {
      artist: this.artistName,
      group_key: 'album',
    };
  }

  createListData() {
    return this.songs.map(s => new ListData(s.id, s.album));
  }
}

export default AlbumListStrategy