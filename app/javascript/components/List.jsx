import React from "react"

class List extends React.Component {
  static propTypes = {
    didClickRow: PropTypes.func.isRequired,
    datas: PropTypes.array.isRequired,
  };

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

export default List