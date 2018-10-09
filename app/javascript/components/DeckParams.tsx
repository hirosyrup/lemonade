import * as React from "react"
import LowpassFilter from "./LowpassFilter";
import LevelMeter from "./LevelMeter";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Filter from "../model/Filter";
import PlayTime from "../model/PlayTime";
import Level from "../model/Level";

interface DeckParamsProps {
    isLeftDeckParams: boolean,
    filter: Filter,
    playTime: PlayTime,
    level: Level,
}

interface DeckParamsState {
    displayPlayTime: string,
}

class DeckParams extends React.Component<DeckParamsProps, DeckParamsState> {
    constructor(props: DeckParamsProps) {
        super(props)

        this.props.playTime.didUpdateCurrentPlayTime = this.didUpdateCurrentPlayTime.bind(this);

        this.state = {
            displayPlayTime: this.playTimeToString(0),
        }
    }

    render() {
        return (
            <React.Fragment>
                <Grid container
                      className={'deck_params container'}>
                    {this.props.isLeftDeckParams ? this.lowpassFilterLayout() : this.levelMeterLayout()}
                    {this.props.isLeftDeckParams ? this.levelMeterLayout() : this.lowpassFilterLayout()}
                </Grid>
            </React.Fragment>
        );
    }

    lowpassFilterLayout() {
        return (
            <Grid item xs={8}>
                <Typography color={"primary"}
                            align={'center'}
                            variant={'headline'}
                            className={'deck_params time_title'}>
                    Time
                </Typography>
                <Typography color={"primary"}
                            align={'center'}
                            variant={'headline'}
                            className={'deck_params time'}>
                    {this.state.displayPlayTime}
                </Typography>
                <LowpassFilter filter={this.props.filter}/>
            </Grid>
        );
    }

    levelMeterLayout() {
        return (
            <Grid item xs={4}>
                <LevelMeter containerClassName={this.props.isLeftDeckParams ? 'level_meter meter_container_left' : 'level_meter meter_container_right'} level={this.props.level}/>
            </Grid>
        );
    }

    didUpdateCurrentPlayTime(playTime: number) {
        this.setState({displayPlayTime: this.playTimeToString(playTime)});
    }

    playTimeToString(playTime: number) {
        const min = Math.floor((playTime / 60.0) % 60.0);
        const sec = Math.floor(playTime % 60.0);
        return this.timeString(min) + ':' + this.timeString(sec);
    }

    timeString(value: number) {
        return ('00' + value).slice(-2);
    }

}

export default DeckParams;
