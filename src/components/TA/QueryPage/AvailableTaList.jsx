import React, { Component } from "react";
import AvailableTa from "./AvailableTa";

class AvailableTaList extends Component {
  state = {};
  render() {
    return (
      <div id="available-TAs" style={{ marginTop: "100px" }}>
        <div class="subtitle2">Available Replacements</div>
        <hr />
        <div class="container">
          {this.props.teachingAssistants.map(TA => (
            <AvailableTa
              first={TA.first}
              last={TA.last}
              email={TA.email}
              phone={TA.phone}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AvailableTaList;
