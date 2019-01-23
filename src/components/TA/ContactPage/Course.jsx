import React, { Component } from "react";

class Course extends Component {
  state = {};
  render() {
    return (
      <tr>
        <td>
          <input
            id={this.props.id}
            type="checkbox"
            className="css-checkbox"
            value={this.props.id}
            checked={this.props.checked}
            onChange={this.props.setCourse}
          />
          <label className="css-label" for={this.props.id}>
            {this.props.id}
          </label>
        </td>
      </tr>
    );
  }
}

export default Course;
