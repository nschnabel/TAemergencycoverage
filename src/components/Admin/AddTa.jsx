import React, { Component } from "react";
import * as $ from "jquery";
import { SUCCESS, SERVER_ERROR } from "../../constants";

class AddTa extends Component {
  state = {
    newInput: ""
  };

  onChange = e => {
    this.setState({ newInput: e.target.value });
  };

  handleNewTeachingAssistant = () => {
    const id = this.state.newInput;
    const self = this;
    $.post(
      "http://nickschnabel.com/server_admin.php",
      { query: "add-user", id: id },
      function(response) {
        //alert(data);
        var data = JSON.parse(response);

        if (data.status == SUCCESS) {
          alert(
            "Student ID " + id + " has been added to the list of qualified TAs"
          );
          self.props.listTeachingAssistants();
        } else if (data.status == SERVER_ERROR) {
          alert("ID " + id + " has already been added");
        }
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="subtitle2" style={{ width: "80%", marginTop: "10px" }}>
          Add Teaching Assistants
        </div>

        <hr />

        <div
          className="enterdata"
          style={{ width: "220px", marginTop: "40px", marginLeft: "60px" }}
        >
          <div style={{ width: "100px", float: "left", paddingTop: "3px" }}>
            Student ID
          </div>
          <input
            type="text"
            id="test-admin-id"
            placeholder="1234567"
            style={{ width: "120px", minHeight: "25px" }}
            onChange={this.onChange}
          />
          <button
            id="test-admin-add"
            style={{ marginTop: "5px", float: "right" }}
            onClick={this.handleNewTeachingAssistant}
          >
            Add
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default AddTa;
