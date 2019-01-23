import React, { Component } from "react";
import * as $ from "jquery";
import QualifiedTa from "./QualifiedTa";
import { SUCCESS, SERVER_ERROR } from "../../constants";

class TaList extends Component {
  state = {};

  handleDelete = id => {
    const self = this;
    if (
      window.confirm("Are you sure you want to remove ID " + id + "?") == true
    ) {
      $.post(
        "http://nickschnabel.com/server_admin.php",
        { query: "remove-user", id: id },
        function(response) {
          var data = JSON.parse(response);
          if (data.status == SUCCESS) {
            alert(
              "ID: " + id + " has been removed from the list of qualified TAs"
            );
            //var element = document.getElementById("test-admin-id");
            //element.index = "";
            self.props.listTeachingAssistants();
          }
        }
      );

      $.post(
        "http://nickschnabel.com/newserver.php",
        { query: "clear-availability", username: id },
        function(response) {}
      );

      $.post(
        "http://nickschnabel.com/newserver.php",
        { query: "clear-courses", username: id },
        function(response) {}
      );
    }
  };

  onClearAll = () => {
    if (window.confirm("Are you sure you want to clear TA list?") == true) {
      $.post(
        "http://nickschnabel.com/server_admin.php",
        { query: "list-users" },
        function(data) {
          var data = JSON.parse(data);
          for (var i = 0; i < data.result.length; i++) {
            $.ajax({
              type: "POST",
              url: "http://nickschnabel.com/server_admin.php",
              data: { query: "remove-user", id: data.result[i].id },
              success: function(data) {},
              async: false
            });
          }
        }
      );
    }
  };

  render() {
    return (
      <div id="qualified-TAs" style={{ marginTop: "75px" }}>
        <button
          onClick={this.onClearAll}
          id="TA-list-clear"
          style={{ float: "right" }}
        >
          Clear All
        </button>
        <div className="subtitle2">Current TAs</div>

        <hr />
        <div id="TA-list" className="container">
          {this.props.teachingAssistants.map(TA => (
            <QualifiedTa
              id={TA.id}
              key={TA.id}
              first={TA.first}
              last={TA.last}
              email={TA.email}
              phone={TA.phone}
              onDelete={this.handleDelete}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default TaList;
