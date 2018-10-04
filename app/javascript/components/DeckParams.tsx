import * as React from "react"
import LowpassFilter from "./LowpassFilter";
import LevelMeter from "./LevelMeter";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface DeckParamsProps {
    isLeftDeckParams: boolean,
}

interface DeckParamsState {
}

class DeckParams extends React.Component<DeckParamsProps, DeckParamsState> {
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
                    01:25
                </Typography>
                <LowpassFilter/>
            </Grid>
        );
    }

    levelMeterLayout() {
        return (
            <Grid item xs={4}>
                <LevelMeter containerClassName={this.props.isLeftDeckParams ? 'level_meter meter_container_left' : 'level_meter meter_container_right'}/>
            </Grid>
        );
    }
}

export default DeckParams;
