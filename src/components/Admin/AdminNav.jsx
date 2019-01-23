import React, { Component } from "react";

class AdminNav extends Component {
  state = {};

  handleLogOut = () => {
    window.location.reload();
  };

  render() {
    return (
      <nav
        className="navbar navbar-default"
        style={{ backgroundColor: "#122E53", minHeight: "70px" }}
      >
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li id="admin-li" className="active">
              <a
                onClick={() => this.props.goToAdminDashboard()}
                id="go-to-manage-TAs"
              >
                Manage Teaching Assistants
              </a>
            </li>
          </ul>
          <div className="dropdown" style={{ float: "right" }}>
            <button id="settings-button">
              <i
                className="fas fa-bars"
                style={{ fontSize: "30px", paddingTop: "8px" }}
              />
            </button>
            <div className="dropdown-content">
              <a
                id="admin-change-password"
                onClick={() => this.props.goToChangePassword()}
              >
                Change Password
              </a>
              <a id="test-admin-logout" onClick={this.handleLogOut}>
                Log Out
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default AdminNav;
