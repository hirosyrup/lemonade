import * as React from "react"
import axios from "./AxiosDefault";
import List from './List'
import ArtistListStrategy from "../model/strategy/ArtistListStrategy";
import AlbumListStrategy from "../model/strategy/AlbumListStrategy";
import SongListStrategy from "../model/strategy/SongListStrategy";
import ListData from "../model/data/ListData";
import ListStrategy from "../model/strategy/ListStrategy";
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface SongListProps {
    didSelectSong: (songData: SongData) => void,
    uuid: string,
}

interface SongListState {
    strategy: ListStrategy,
    layer: number,
}

class SongList extends React.Component<SongListProps, SongListState> {
    private readonly bindDidClickRow: (listData: ListData) => void
    private readonly bindDidClickBack: () => void

    constructor(props: SongListProps) {
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

    componentWillReceiveProps() {
        this.updateCurrentList();
    }

    render() {
        return (
            <React.Fragment>
                <div className='song_list list_box'>
                    <Grid container
                          alignItems={'baseline'}>
                        <Grid item xs={1}>
                            <Button color={"primary"}
                                    style={{visibility: this.backButtonHidden()}}
                                    onClick={this.bindDidClickBack}><KeyboardArrowLeft/></Button>
                        </Grid>
                        <Grid item xs={11}>
                            <Typography color={"primary"}
                                        align={'center'}>
                                {this.state.strategy.title()}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid className='song_list scroll_box'>
                        <List datas={this.state.strategy.createListData()} didClickRow={this.bindDidClickRow}/>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }

    updateCurrentList() {
        this.updateList(this.state.strategy, this.state.layer)
    }

    updateList(strategy: ListStrategy, layer: number) {
        this.fetch(strategy)
            .then((data: SongData[]) => {
                strategy.setSongDatas(data);
                this.setState({strategy: strategy, layer: layer});
            })
            .catch(() => {
            })
    }

    toNextList(selectedListData: ListData) {
        let strategy: ListStrategy | null = null;
        let layer: number | null = null;
        switch (this.state.layer) {
            case 0:
                strategy = new AlbumListStrategy(selectedListData.name);
                layer = 1;
                break;
            case 1:
                strategy = new SongListStrategy(this.state.strategy.artistName(), selectedListData.name);
                layer = 2;
                break;
            default:
                break;
        }

        if (strategy && layer) {
            this.updateList(strategy, layer);
        }
    }

    toPreviousList() {
        let strategy: ListStrategy | null = null;
        let layer: number | null = null;
        switch (this.state.layer) {
            case 1:
                strategy = new ArtistListStrategy();
                layer = 0;
                break;
            case 2:
                strategy = new AlbumListStrategy(this.state.strategy.artistName());
                layer = 1;
                break;
            default:
                break;
        }

        if (strategy && layer !== null) {
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

    songAt(id: number) {
        return this.state.strategy.songDatas().find((song) => {
            return song.id === id;
        });
    }

    fetch(strategy: ListStrategy) {
        return new Promise((resolve, reject) => {
            let params = strategy.createFetchParams();
            params['uuid'] = this.props.uuid;
            axios.get('music_player/songs', {
                params: params
            })
                .then((results) => {
                    console.log(results)
                    let song: SongData = JSON.parse(JSON.stringify(results.data));
                    resolve(song);
                })
                .catch((data) => {
                    console.log(data);
                    reject(data);
                })
        });
    }

    didClickRow(listData: ListData) {
        if (this.isLast()) {
            const song = this.songAt(listData.id);
            if (song === undefined) return;
            this.props.didSelectSong(song);
        } else {
            this.toNextList(listData);
        }
    }

    didClickBack() {
        this.toPreviousList();
    }
}

export default SongList;