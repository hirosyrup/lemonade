import ListData from "../data/ListData";
import ListStrategy from "./ListStrategy";

class ArtistListStrategy implements ListStrategy {
    songs: SongData[];

    constructor() {
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

    artistName() {
        return '';
    }

    songDatas() {
        return this.songs;
    }

    setSongDatas(datas: SongData[]) {
        this.songs = datas
    }
}

export default ArtistListStrategy