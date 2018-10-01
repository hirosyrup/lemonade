import * as React from "react"
import LowpassFilter from "./LowpassFilter";

interface DeckParamsProps {
}

interface DeckParamsState {
}

class DeckParams extends React.Component<DeckParamsProps, DeckParamsState> {
    render() {
        return (
            <React.Fragment>
                <LowpassFilter/>
            </React.Fragment>
        );
    }
}

export default DeckParams;
