import React, { Component } from "react";

class QualifiedTa extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <table
          style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
        >
          <tbody>
            <tr>
              <td style={{ textAlign: "left", width: "10%" }}>
                <div className="TA-id">{this.props.id}</div>
              </td>
              <td style={{ width: "22%" }}>
                {this.props.first} {this.props.last}
              </td>
              <td style={{ width: "26%" }}>{this.props.email}</td>
              <td style={{ width: "27%" }}>{this.props.phone}</td>
              <td style={{ width: "15%" }}>
                <button
                  className="remove-ta"
                  style={{ marginTop: "15px", float: "right" }}
                  onClick={() => this.props.onDelete(this.props.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
      </React.Fragment>
    );
  }
}

export default QualifiedTa;
