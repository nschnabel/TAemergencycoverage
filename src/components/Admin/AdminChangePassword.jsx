import React, { Component } from "react";
import * as $ from "jquery";
import { SUCCESS } from "../../constants";

class AdminChangePassword extends Component {
  state = { newPassword: "", repeatPassword: "" };

  handleChangePassword = () => {
    const password = this.state.newPassword;
    const repeat = this.state.repeatPassword;

    if (password === "") {
      alert("Please enter a password");
      return;
    }

    if (password === repeat) {
      $.post(
        "http://nickschnabel.com/server_admin.php",
        { query: "change-password", password: password },
        function(response) {
          //alert(data);
          var data = JSON.parse(response);
          if (data.status === SUCCESS) {
            alert("Password saved successfully");
          }
        }
      );
    } else {
      alert("Passwords don't match");
    }
  };

  onPasswordChange = e => {
    this.setState({ newPassword: e.target.value });
  };

  onRepeatChange = e => {
    this.setState({ repeatPassword: e.target.value });
  };

  render() {
    return (
      <div id="changepassword" style={{ paddingTop: "20px" }}>
        <div className="subtitle2" style={{ marginTop: "10px" }}>
          Change Password
        </div>
        <hr />
        <div className="container enterdata" style={{ marginTop: "30px" }}>
          <table>
            <tr>
              <td>New password: </td>
              <td>
                <input
                  type="password"
                  id="test-password"
                  placeholder="password"
                  onChange={this.onPasswordChange}
                />
              </td>
            </tr>
            <tr>
              <td>Repeat password: </td>
              <td>
                <input
                  type="password"
                  id="test-password-repeat"
                  placeholder="password"
                  onChange={this.onRepeatChange}
                />
              </td>
            </tr>
          </table>

          <button
            id="test-password-submit"
            style={{ marginTop: "15px" }}
            onClick={this.handleChangePassword}
          >
            Change
          </button>
        </div>
      </div>
    );
  }
}

export default AdminChangePassword;
