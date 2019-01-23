import React, { Component } from "react";

class Navbar extends Component {
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
            <li id="query-li" className="active">
              <a id="go-to-query" onClick={this.props.goToQueryPage}>
                TA Search
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
              <a onClick={this.props.goToInfoPage}> Personal Info</a>
              <a id="change-password" onClick={this.props.goToPasswordPage}>
                Change Password
              </a>
              <a id="test-logout" onClick={this.handleLogOut}>
                Log Out
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
