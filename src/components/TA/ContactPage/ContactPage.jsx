import React, { Component } from "react";
import ContactInfo from "./ContactInfo";
import QualifiedCourses from "./QualifiedCourses";
import Availability from "./Availability";

class ContactPage extends Component {
  state = {};

  addToTime = str => {
    let time = str;
    let hours = Number(time.match(/^(\d+)/)[1]);
    let minutes = Number(time.match(/:(\d+)/)[1]);
    minutes += 15;
    let sminutes = minutes.toString();
    if (sminutes === "60") {
      sminutes = "00";
      hours++;
    }

    const shours = hours.toString();
    return shours + ":" + sminutes + ":00";
  };

  saveAll = () => {
    this.contactInfo.submitInfo();
    window.setTimeout(this.qualifiedCourses.submitCourses, 250);
    window.setTimeout(this.availability.submitAvailability, 250);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ width: "100%", marginTop: "20px" }}>
          <button
            onClick={this.saveAll}
            id="save-all"
            style={{ float: "right" }}
          >
            Save All
          </button>
        </div>
        <ContactInfo
          id={this.props.id}
          onRef={ref => (this.contactInfo = ref)}
        />
        <QualifiedCourses
          id={this.props.id}
          onRef={ref => (this.qualifiedCourses = ref)}
        />
        <Availability
          id={this.props.id}
          onRef={ref => (this.availability = ref)}
          addToTime={this.addToTime}
        />
      </React.Fragment>
    );
  }
}

export default ContactPage;
