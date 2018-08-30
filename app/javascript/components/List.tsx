import * as React from "react"
import ListData from "../model/data/ListData";

interface ListProps {
    didClickRow: (listData: ListData) => void,
    datas: ListData[],
}

interface ListState {
}

class List extends React.Component<ListProps, ListState> {
    render() {
        return (
            <React.Fragment>
                <ul>
                    {this.props.datas.map(data => {
                        return <li key={data.id}
                                   onClick={() => this.props.didClickRow(data)}>{data.name}</li>;
                    })}
                </ul>
            </React.Fragment>
        );
    }
}

export default List;