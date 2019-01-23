import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import LogIn from "./components/LogIn";
import "./App.css";
import Admin from "./components/Admin/Admin";
import Dashboard from "./components/TA/Dashboard";

const Auth = {
  isAuthenticated: false,
  user: "",
  admin: false,
  authenticate() {
    this.isAuthenticated = true;
  },
  setUser(u) {
    this.user = u;
  },
  setAdmin() {
    this.admin = true;
  }
};

class App extends Component {
  state = {
    loggedIn: false,
    admin: false,
    user: ""
  };

  handleLogin = (loggedIn, admin, user) => {
    this.setState({
      loggedIn: loggedIn,
      admin: admin,
      user: user
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router basename={"/TAEC"}>
          <div>
            <Route
              exact
              path="/"
              render={props => (
                <LogIn {...props} auth={Auth} onLogin={this.handleLogin} />
              )}
            />
            <Route
              exact
              path="/dashboard"
              render={props =>
                Auth.isAuthenticated ? (
                  <Dashboard {...props} />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/",
                      state: { from: this.props.location }
                    }}
                  />
                )
              }
            />
            {/* <Route exact path="/dashboard" component={TAquery} /> */}
            <Route
              exact
              path="/admin"
              render={props =>
                Auth.isAuthenticated ? (
                  <Admin {...props} />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/",
                      state: { from: this.props.location }
                    }}
                  />
                )
              }
            />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
