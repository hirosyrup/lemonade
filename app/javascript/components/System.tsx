import * as React from "react"
import axios from "./AxiosDefault";
import Deck from './Deck';

interface SystemProps {
}

interface SystemState {
    uuid: string | null;
}

class System extends React.Component<SystemProps, SystemState> {
    constructor(props: SystemProps) {
        super(props);
        this.state = {
            uuid: null,
        }
    }

    componentDidMount() {
        this.fetchUUID();
    }

    render() {
        return (
            <React.Fragment>
                {this.state.uuid && <Deck uuid={this.state.uuid}/>}
            </React.Fragment>
        );
    }

    fetchUUID() {
        axios.get('music_player/uuid')
            .then((results) => {
                this.setState({uuid: results.data['uuid']});
            })
            .catch((data) => {
                console.log(data);
            });
    }
}

export default System;
