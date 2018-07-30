import React from "react"
import PropTypes from "prop-types"

export default class Square extends React.Component {
  render () {
    return (
      <React.Fragment>
        <button className="square">
          
        </button>
      </React.Fragment>
    );
  }
}

Square.propTypes = {
  value: PropTypes.number
};
