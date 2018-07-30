import React from "react"
import Square from "components/Square"

export default class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    return (
      <React.Fragment>
        <div className="board-row">
          {this.renderSquare(0)}
        </div>
      </React.Fragment>
    );
  }
}
