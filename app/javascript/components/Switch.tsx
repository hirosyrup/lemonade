import * as React from "react"
import Theme from './../model/theme'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface SwitchProps {
    title: string,
    didChange: (isOn: boolean) => void,
}

interface SwitchState {
    isOn: boolean,
}

class Switch extends React.Component<SwitchProps, SwitchState> {
    private readonly bindOnClick: () => void;

    constructor(props: SwitchProps) {
        super(props);
        this.bindOnClick = this.onClick.bind(this);

        this.state = {
            isOn: false,
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className={'switch bg_div'}>
                    <div className={this.state.isOn ? 'switch bg_on' : 'switch bg_off'}
                         style={{backgroundColor: Theme.palette.primary.main}}/>
                </div>
                <div className={'switch button_div'}>
                    <Button variant='outlined'
                            color={"primary"}
                            className={this.state.isOn ? 'switch button_on' : 'switch button_off'}
                            onClick={this.bindOnClick}>
                        <Typography className={'switch title'}>
                            {this.props.title}
                        </Typography>
                    </Button>
                </div>
            </React.Fragment>
        );
    }

    onClick() {
        this.props.didChange(!this.state.isOn)
        this.setState({isOn: !this.state.isOn})
    }
}

export default Switch;