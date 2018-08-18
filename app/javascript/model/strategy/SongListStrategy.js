import ListData from "../data/ListData";

class SongListStrategy {
  constructor (artistName, albumName) {
    this.songs = [];
    this.artistName = artistName;
    this.albumName = albumName;
  }

  createFetchParams() {
    return {
      artist: this.artistName,
      album: this.albumName,
    };
  }

  createListData() {
    return this.songs.map(s => new ListData(s.id, s.title));
  }

  title() {
    return 'Songs';
  }
}

export default SongListStrategy