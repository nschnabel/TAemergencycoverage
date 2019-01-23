import React, { Component } from "react";
import "./LogIn.css";
import * as $ from "jquery";
import UserProfile from "./UserProfile";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class LogIn extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    id: "",
    password: "",
    admin: false,
    redirectToDashboard: false,
    redirectToAdmin: false
  };

  onChange = e => {
    this.setState({ id: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  changeLogin = () => {
    const admin = !this.state.admin;
    this.setState({ admin });
  };

  handleLogin = () => {
    const self = this;
    if (this.state.admin) {
      $.post(
        "http://nickschnabel.com/login.php",
        {
          username: this.state.id,
          password: this.state.password,
          type: "admin"
        },
        function(response) {
          console.log(response);
          const data = JSON.parse(response);
          if (data.status === 0) {
            //alert("Logged In");
            self.props.auth.authenticate();
            self.setState({ redirectToAdmin: true });
          } else {
            alert("Incorrect Username or Password");
          }
        }
      );
    } else {
      $.post(
        "http://nickschnabel.com/login.php",
        {
          username: this.state.id,
          password: this.state.password,
          type: "user"
        },
        function(response) {
          const data = JSON.parse(response);
          if (data.status === 0) {
            //alert("successful");
            localStorage.setItem("id", self.state.id);
            self.props.auth.authenticate();
            self.setState({ redirectToDashboard: true });
          } else {
            alert("Incorrect User ID or Password");
          }
        }
      );
    }
  };

  render() {
    let { redirectToDashboard, redirectToAdmin } = this.state;

    if (redirectToDashboard) {
      //console.log("here");
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { from: this.props.location }
          }}
        />
      );
    }

    if (redirectToAdmin) {
      return (
        <Redirect
          to={{
            pathname: "/admin",
            state: { from: this.props.location }
          }}
        />
      );
    }

    return (
      <div className="container" id="login">
        <div className="title">TA Emergency Portal</div>
        <div className="row">
          <div
            id={this.state.admin ? "admin-modal" : "ta-modal"}
            className="modal-box col-xs-8 col-xs-push-2 col-sm-6 col-sm-push-3 col-md-4 col-md-push-4"
          >
            <div className="login-field">
              <div
                style={{
                  fontFamily: "product-sans-bold",
                  fontSize: "15px",
                  padding: "40px 0 0 0"
                }}
              >
                {this.state.admin ? "ADMIN" : ""} LOGIN
              </div>
              <div
                className="login-input-wrapper"
                style={{ margin: "30px 0 0 0" }}
              >
                <div className="icon">
                  <i className="icon-user icon-large" />
                </div>
                <div className="login-input">
                  <input
                    type="text"
                    id="login-username"
                    placeholder={this.state.admin ? "Username" : "Student ID"}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div
                className="login-input-wrapper"
                style={{ margin: "20px 0 0 0" }}
              >
                <div className="icon">
                  <i className="icon-lock icon-large" />
                </div>
                <div className="login-input">
                  <input
                    type="password"
                    id="login-password"
                    placeholder="Password"
                    onChange={this.onPasswordChange}
                  />
                </div>
              </div>
              <button onClick={this.handleLogin} id="login-submit">
                SIGN IN
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            style={{ textAlign: "right", paddingRight: "15px" }}
            className="col-xs-8 col-xs-push-2 col-sm-6 col-sm-push-3 col-md-4 col-md-push-4"
          >
            <a onClick={this.changeLogin} style={{ color: "white" }}>
              {this.state.admin ? "TA" : "Admin"} Login
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
