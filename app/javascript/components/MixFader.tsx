import * as React from "react"

interface MixFaderProps {
}

interface MixFaderState {
}

class MixFader extends React.Component<MixFaderProps, MixFaderState> {
    render() {
        return (
            <React.Fragment>
                <img src={'assets/mix_fader_bg.png'}
                     className={'mix_fader bg'}
                     draggable={false}/>
            </React.Fragment>
        );
    }
}

export default MixFader;