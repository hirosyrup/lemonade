import * as React from "react"
import Typography from '@material-ui/core/Typography';

interface TempoControlProps {
}

interface TempoControlState {
    sliderValue: number,
}

class TempoControl extends React.Component<TempoControlProps, TempoControlState> {
    private readonly bindOnSliderChange: (e: any) => void;
    private readonly faderMax: number;

    constructor(props: TempoControlProps) {
        super(props);

        this.bindOnSliderChange = this.onSliderChange.bind(this);
        this.faderMax = 100.0;

        this.state = {
            sliderValue: 50.0,
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className={'tempo_control root'}>
                    <Typography color={"primary"}
                                align={'center'}
                                variant={'subheading'}
                                className={'tempo_control tempo_title'}>
                        Tempo
                    </Typography>
                    <Typography color={"primary"}
                                align={'center'}
                                variant={'title'}
                                className={'tempo_control tempo'}>
                        ×1.2
                    </Typography>
                    <div>
                        <img src={'assets/tempo_fader_bg.png'}
                             className={'tempo_control fader_bg'}
                             draggable={false}/>
                        <input type="range"
                               min="0"
                               max={this.faderMax}
                               value={this.state.sliderValue}
                               className="tempo_control input-range"
                               onChange={this.bindOnSliderChange}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    onSliderChange(e: React.FormEvent<HTMLInputElement>) {
        const value = parseFloat(e.currentTarget.value);
        this.setState({sliderValue: value});
    }
}

export default TempoControl;