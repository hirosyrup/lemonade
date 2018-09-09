import * as React from "react"
import ListData from "../model/data/ListData";
import MaterialList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Theme from './../model/theme'

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
                <MaterialList>
                        {this.props.datas.map(data => {
                            return (
                                <div>
                                    <ListItem button
                                              onClick={() => this.props.didClickRow(data)}>
                                        <ListItemText><Typography
                                            color={'primary'}>{data.name}</Typography></ListItemText>
                                    </ListItem>
                                    <Divider style={{background: Theme.palette.primary.dark}}/>
                                </div>
                            );
                        })}
                </MaterialList>
            </React.Fragment>
        );
    }
}

export default List;