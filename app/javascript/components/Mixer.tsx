import * as React from "react"
import MixFader from "./MixFader";

interface MixerProps {
}

interface MixerState {
}

class Mixer extends React.Component<MixerProps, MixerState> {
    render() {
        return (
            <React.Fragment>
                <div className={'mixer root'}>
                    <div></div>
                    <div className={'mixer mix_fader'}>
                        <MixFader/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Mixer;