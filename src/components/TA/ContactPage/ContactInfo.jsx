import React, { Component } from "react";
import { SUCCESS } from "../../../constants";
import * as $ from "jquery";

class ContactInfo extends Component {
  state = {
    first: "",
    last: "",
    email: "",
    phone: "",
    id: ""
  };

  componentDidMount = () => {
    this.props.onRef(this);
    const id = this.props.id;
    $.post(
      "http://nickschnabel.com/newserver.php",
      { query: "get-info", username: id },
      response => {
        const data = JSON.parse(response);
        if (data.status === SUCCESS) {
          this.setState({
            first: data.result.fname,
            last: data.result.lname,
            email: data.result.email,
            phone: data.result.phone,
            id: data.result.id
          });
        } else {
          alert("get-info failed, status " + data.status);
        }
      }
    );
  };

  onFirstNameChange = e => {
    this.setState({ first: e.target.value });
  };

  onLastNameChange = e => {
    this.setState({ last: e.target.value });
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPhoneChange = e => {
    this.setState({ phone: e.target.value });
  };

  submitInfo = () => {
    const fname = this.state.first;
    const lname = this.state.last;
    const email = this.state.email;
    let phone = this.state.phone;

    const fname_is_valid = /^[a-zA-Z ]+$/.test(fname);
    const lname_is_valid = /^[a-zA-Z ]+$/.test(lname);
    const phone_is_valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
      phone
    );

    var invalid = false;

    if (!fname_is_valid || fname == "") {
      alert("Please enter a valid first name");
      invalid = true;
    }

    if (!lname_is_valid || lname == "") {
      alert("Please enter a valid last name");
      invalid = true;
    }

    if (!phone_is_valid && phone != "") {
      alert("Please enter a valid 10 digit phone number");
      invalid = true;
    } else {
      phone = phone.replace(
        /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/,
        "$1-$2-$3"
      );
    }

    if (email.toUpperCase().indexOf("@SCU.EDU") <= -1) {
      alert("Please enter a valid SCU email");
      invalid = true;
    }

    if (invalid) {
      return;
    }

    const id = this.props.id;

    $.ajax({
      type: "POST",
      url: "http://nickschnabel.com/newserver.php",
      data: {
        query: "modify-info",
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        username: id
      },
      success: response => {
        var data = JSON.parse(response);
        if (data.status === SUCCESS) {
          alert("Contact information saved");
        }
      },
      async: false
    });
  };

  render() {
    return (
      <div id="TAinfo">
        <div className="subtitle2" style={{ width: "80%", marginTop: "0px" }}>
          Contact Information
        </div>
        <hr />

        <div
          className="enterdata container"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <button
            onClick={this.submitInfo}
            id="test-modify-submit"
            style={{ float: "right" }}
          >
            Save
          </button>
          <div
            className="row"
            style={{
              marginTop: "25px",
              marginBottom: "20px",
              padding: "0 20px"
            }}
          >
            <div className="col-xs-6 col-sm-3">
              <span style={{ float: "left", paddingTop: "5px" }}>
                Student ID :
              </span>
              <span style={{ float: "left", width: "80px" }}>
                <input
                  type="text"
                  value={this.props.id}
                  style={{
                    color: "#444",
                    fontSize: "16px",
                    border: "0"
                  }}
                  readOnly
                />
              </span>
            </div>
          </div>
          <div
            className="row"
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              padding: "0 20px"
            }}
          >
            <div className="col-xs-6 col-sm-3" style={{ marginBottom: "15px" }}>
              <div style={{ margin: "0 20px" }}>
                <input
                  type="text"
                  id="test-modify-fname"
                  value={this.state.first}
                  placeholder="First Name"
                  onChange={this.onFirstNameChange}
                />
              </div>
            </div>
            <div className="col-xs-6 col-sm-3" style={{ marginBottom: "15px" }}>
              <div style={{ margin: "0 20px" }}>
                <input
                  type="text"
                  id="test-modify-lname"
                  value={this.state.last}
                  placeholder="Last Name"
                  onChange={this.onLastNameChange}
                />
              </div>
            </div>

            <div className="col-xs-6 col-sm-3">
              <div style={{ margin: "0 20px" }}>
                <input
                  type="text"
                  id="test-modify-email"
                  value={this.state.email}
                  placeholder="E-Mail"
                  onChange={this.onEmailChange}
                />
              </div>
            </div>
            <div className="col-xs-6 col-sm-3">
              <div style={{ margin: "0 20px" }}>
                <input
                  type="text"
                  id="test-modify-phone"
                  value={this.state.phone}
                  placeholder="Phone Number"
                  onChange={this.onPhoneChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactInfo;
