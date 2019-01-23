import React, { Component } from "react";
import "../../App.css";
import AdminNav from "./AdminNav";
import AddTa from "./AddTa";
import TaList from "./TaList";
import * as $ from "jquery";
import AdminChangePassword from "./AdminChangePassword";

class Admin extends Component {
  state = {
    TeachingAssistants: [],
    changePassword: false
  };

  listTeachingAssistants = () => {
    let TeachingAssistants = [];
    $.post(
      "http://nickschnabel.com/server_admin.php",
      { query: "list-users" },
      response => {
        //$("#TA-list").html("");
        //console.log(response);
        const data = JSON.parse(response);
        if (data.result.length > 0) {
          //var markup = "";
          //console.log(data);
          for (var i = 0; i < data.result.length; i++) {
            const TA = {
              id: data.result[i].id ? data.result[i].id : "ID",
              first: data.result[i].fname ? data.result[i].fname : "First",
              last: data.result[i].lname ? data.result[i].lname : "Last",
              email: data.result[i].email ? data.result[i].email : "Email",
              phone: data.result[i].phone ? data.result[i].phone : "Phone"
            };

            //console.log(TA);

            TeachingAssistants.push(TA);
            //console.log(this);
            this.setState({ TeachingAssistants });
          }
        }
      }
    );
  };

  componentDidMount() {
    this.listTeachingAssistants();
  }

  goToChangePassword = () => {
    const changePassword = true;
    this.setState({ changePassword });
  };

  goToAdminDashboard = () => {
    const changePassword = false;
    this.setState({ changePassword });
  };

  mainPage = () => {
    return (
      <div id="manage-TAs" style={{ paddingTop: "20px" }}>
        <AddTa listTeachingAssistants={this.listTeachingAssistants} />
        <TaList
          teachingAssistants={this.state.TeachingAssistants}
          listTeachingAssistants={this.listTeachingAssistants}
        />
        <div
          style={{
            width: "100%",
            minHeight: "60px"
          }}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="whole-page">
        <div
          className="container-fluid"
          id="admin-header"
          style={{ display: "block", padding: "0" }}
        >
          <AdminNav
            goToChangePassword={this.goToChangePassword}
            goToAdminDashboard={this.goToAdminDashboard}
          />
        </div>
        <div className="container-fluid" id="admin-main">
          {this.state.changePassword ? (
            <AdminChangePassword />
          ) : (
            this.mainPage()
          )}
        </div>
      </div>
    );
  }
}

export default Admin;
