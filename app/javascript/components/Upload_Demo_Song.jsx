import React from "react"
import Upload from './Upload'

class Upload_Demo_Song extends React.Component {
  static propTypes = {
    uuid: PropTypes.string.isRequired,
  };

  render() {
    return (
        <React.Fragment>
          <Upload uuid={this.props.uuid}/>
        </React.Fragment>
    );
  }
}

export default Upload_Demo_Song;