import * as React from "react"
import Upload from './Upload'

interface UploadDemoSongProps {
    uuid: string,
}

interface UploadDemoSongState {
}

class UploadDemoSong extends React.Component<UploadDemoSongProps, UploadDemoSongState> {
    render() {
        return (
            <React.Fragment>
                <Upload didUploaded={null} uuid={this.props.uuid}/>
            </React.Fragment>
        );
    }
}

export default UploadDemoSong;