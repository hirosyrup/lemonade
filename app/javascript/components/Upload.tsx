import * as React from "react"
import axios from "./AxiosDefault";
import Button from '@material-ui/core/Button';
import Theme from './../model/theme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

interface UploadProps {
    didUploaded: (() => void) | null,
    uuid: string,
}

interface UploadState {
    indicator_display: string;
}

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

class Upload extends React.Component<UploadProps, UploadState> {
    readonly bindHandleChange: () => void;
    readonly bindHandleClick: () => void;
    private inputFileTagName: string;

    constructor(props: UploadProps) {
        super(props)
        this.state = {
            indicator_display: 'none',
        }
        this.bindHandleChange = this.handleChange.bind(this);
        this.bindHandleClick = this.handleClick.bind(this);
        this.inputFileTagName = Math.random().toString(36);
    }

    handleChange = (e?: HTMLInputEvent) => {
        if (e === undefined || !e.target.files) return;
        let files: any = e.target.files[0];
        if (files === undefined) {
            return;
        }

        let form = new FormData();
        form.append('file', files);
        form.append('uuid', this.props.uuid);

        this.showIndicator();
        axios.post('resources/songs/create', form)
            .then((results) => {
                console.log(results)
                this.hideIndicator();
                if (this.props.didUploaded) {
                    this.props.didUploaded();
                }
            })
            .catch((exception) => {
                this.hideIndicator();
                alert(exception.response.data.message);
            });
    }

    render() {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={Theme}>
                    <input type='file' name={this.inputFileTagName} style={{display: 'none'}} onChange={this.bindHandleChange}/>
                    <div>
                        <Button variant='outlined'
                                color={"primary"}
                                onClick={this.bindHandleClick}>file select</Button>
                        <img src='assets/indicator.gif' style={{display: this.state.indicator_display}}/>
                    </div>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }

    showIndicator() {
        this.setState({indicator_display: 'inline-block'});
    }

    hideIndicator() {
        this.setState({indicator_display: 'none'});
    }

    handleClick() {
        document.getElementsByName(this.inputFileTagName)[0].click();
    }
}

export default Upload;