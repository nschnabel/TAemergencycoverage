import React, { Component } from "react";
import Navbar from "./Navbar";
import QueryPage from "./QueryPage/QueryPage";
import ContactPage from "./ContactPage/ContactPage";
import ChangePassword from "./ChangePassword";

class Dashboard extends Component {
  state = {
    page: "query",
    id: localStorage.getItem("id")
  };

  goToQueryPage = () => {
    const page = "query";
    this.setState({ page });
  };

  goToPasswordPage = () => {
    const page = "password";
    this.setState({ page });
  };

  goToInfoPage = () => {
    const page = "info";
    this.setState({ page });
  };

  mainContent = () => {
    switch (this.state.page) {
      case "query":
        return <QueryPage id={this.state.id} />;
      case "info":
        return <ContactPage id={this.state.id} />;
      case "password":
        return <ChangePassword id={this.state.id} />;
    }
  };

  render() {
    return (
      <div className="whole-page">
        <div className="container-fluid" id="header" style={{ padding: "0" }}>
          <Navbar
            goToPasswordPage={this.goToPasswordPage}
            goToInfoPage={this.goToInfoPage}
            goToQueryPage={this.goToQueryPage}
          />
        </div>
        <div className="container-fluid" id="main-content">
          {this.mainContent()}
        </div>
      </div>
    );
  }
}

export default Dashboard;
