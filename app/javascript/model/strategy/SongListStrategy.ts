import ListData from "../data/ListData";
import ListStrategy from "./ListStrategy";

class SongListStrategy implements ListStrategy {
    songs: SongData[];
    private readonly artist: string;
    private readonly albumName: string;

    constructor(artistName: string, albumName: string) {
        this.songs = [];
        this.artist = artistName;
        this.albumName = albumName;
    }

    createFetchParams() {
        return {
            artist: this.artist,
            album: this.albumName,
        };
    }

    createListData() {
        return this.songs.map(s => new ListData(s.id, s.title));
    }

    title() {
        return 'Songs';
    }

    artistName() {
        return this.artist;
    }

    songDatas() {
        return this.songs;
    }

    setSongDatas(datas: SongData[]) {
        this.songs = datas
    }
}

export default SongListStrategy