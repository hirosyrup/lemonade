import * as React from "react"

interface TurntableProps {
}

interface TurntableState {
}

class Turntable extends React.Component<TurntableProps, TurntableState> {
    render() {
        return (
            <React.Fragment>
                <img src='assets/turntable.png' />
            </React.Fragment>
        );
    }
}

export default Turntable;
