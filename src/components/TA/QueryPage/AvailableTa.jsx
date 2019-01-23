import React, { Component } from "react";

class AvailableTa extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <table
          style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
        >
          <tbody>
            <tr>
              <td style={{ width: "33%" }}>
                {this.props.first} {this.props.last}
              </td>
              <td style={{ width: "33%" }}>{this.props.email}</td>
              <td style={{ width: "33%" }}>{this.props.phone}</td>
            </tr>
          </tbody>
        </table>
        <hr />
      </React.Fragment>
    );
  }
}

export default AvailableTa;
