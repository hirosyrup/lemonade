import ListData from "../data/ListData";

interface ListStrategy {
    createFetchParams(): {[key: string]: string};
    createListData(): ListData[];
    title(): string;
    artistName(): string;
    songDatas(): SongData[];
    setSongDatas(datas: SongData[]): void;
}

export default ListStrategy