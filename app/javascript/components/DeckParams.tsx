import * as React from "react"
import Switch from "./Switch";

interface DeckParamsProps {
}

interface DeckParamsState {
}

class DeckParams extends React.Component<DeckParamsProps, DeckParamsState> {
    private readonly bindDidChangeLPFSwith: (isOn: boolean) => void;

    constructor(props: DeckParamsProps) {
        super(props);
        this.bindDidChangeLPFSwith = this.didChangeLPFSwith.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <Switch title={'LPF'} didChange={this.bindDidChangeLPFSwith}/>
            </React.Fragment>
        );
    }

    didChangeLPFSwith(isOn: boolean) {
        console.log(isOn);
    }
}

export default DeckParams;