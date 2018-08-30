import * as React from "react"
import axios from "./AxiosDefault";

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
    readonly bindHandleChange: () => void

    constructor(props: UploadProps) {
        super(props)
        this.state = {
            indicator_display: 'none',
        }
        this.bindHandleChange = this.handleChange.bind(this);
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
                <input type='file' name='song' style={{display: 'none'}} onChange={this.bindHandleChange}/>
                <div>
                    <input type='button' value='file select' onClick={this.handleClick}/>
                    <img src='assets/indicator.gif' style={{display: this.state.indicator_display}}/>
                </div>
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
        document.getElementsByName("song")[0].click();
    }
}

export default Upload;