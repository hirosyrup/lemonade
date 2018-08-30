import ListData from "../data/ListData";
import ListStrategy from "./ListStrategy"

class AlbumListStrategy implements ListStrategy{
    songs: SongData[];
    private readonly artist: string;

    constructor(artistName: string) {
        this.songs = [];
        this.artist = artistName;
    }

    createFetchParams() {
        return {
            artist: this.artist,
            group_key: 'album',
        };
    }

    createListData() {
        return this.songs.map(s => new ListData(s.id, s.album));
    }

    title() {
        return 'Albums';
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

export default AlbumListStrategy