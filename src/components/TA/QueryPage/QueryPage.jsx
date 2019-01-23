import React, { Component } from "react";
import * as $ from "jquery";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import AvailableTaList from "./AvailableTaList";

class QueryPage extends Component {
  state = {
    course: "",
    day: "",
    startTime: "",
    endTime: "",
    showList: false,
    teachingAssistants: []
  };

  convertTimeFormat = str => {
    const time = str;
    const hours = Number(time.match(/^(\d+)/)[1]);
    const minutes = Number(time.match(/:(\d+)/)[1]);
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes == 0) sMinutes = "00";
    return sHours + ":" + sMinutes;
  };

  listAvailableTAs = () => {
    const teachingAssistants = [];
    const course = this.state.course;
    const day = this.state.day;
    let t_start = this.state.startTime;
    let t_end = this.state.endTime;
    const id = this.props.id;

    t_start = this.convertTimeFormat(t_start);
    t_end = this.convertTimeFormat(t_end);

    const t_start_is_valid = /^((1[0-2]|0?[1-9]):([0-5][0-9])\s?([AaPp][Mm]))$/.test(
      t_start
    );
    const t_end_is_valid = /^((1[0-2]|0?[1-9]):([0-5][0-9])\s?([AaPp][Mm]))$/.test(
      t_end
    );

    var invalid = false;

    if (course == "") {
      alert("Please select a course");
      invalid = true;
    }

    if (day == "") {
      alert("Please select a day");
      invalid = true;
    }

    if (t_start == "") {
      alert("Please enter a start time");
      invalid = true;
    }

    if (t_end == "") {
      alert("Please enter an end time");
      invalid = true;
    }

    if (invalid) {
      return;
    }

    $.post(
      "http://localhost:8888/server.php",
      {
        query: "search",
        course: course,
        day: day,
        t_start: t_start,
        t_end: t_end,
        id: id
      },
      response => {
        const data = JSON.parse(response);
        console.log(data);
        if (data.length > 0) {
          this.setState({ showList: true });

          for (var i = 0; i < data.length; i++) {
            const TA = {
              first: data[i].fname,
              last: data[i].lname,
              email: data[i].email,
              phone: data[i].phone
            };

            teachingAssistants.push(TA);
            this.setState({ teachingAssistants });
          }
        } else {
          alert("No available TAs found");
          this.setState({ showList: false });
        }
      }
    );
  };

  // onPasswordChange = e => {
  //   this.setState({ newPassword: e.target.value });
  // };

  onClassChange = e => {
    this.setState({ course: e.target.value });
  };

  onDayChange = e => {
    this.setState({ day: e.target.value });
  };

  onStartTimeChange = value => {
    let time = "";
    if (value != null) {
      time = value.hour() + ":" + value.minute();
    }
    this.setState({ startTime: time });
  };

  onEndTimeChange = value => {
    let time = "";
    if (value != null) {
      time = value.hour() + ":" + value.minute();
    }
    this.setState({ endTime: time });
  };

  render() {
    return (
      <React.Fragment>
        <div className="subtitle2" style={{ width: "80%" }}>
          Search for Available TAs
        </div>
        <hr />

        <div className="enterdata">
          <div
            className="row"
            style={{
              marginBottom: "5px",
              padding: "0 20px"
            }}
          >
            <div className="col-xs-6 col-sm-3" style={{ marginBottom: "15px" }}>
              <div style={{ margin: "0 20px" }}>
                <select id="test-course" onChange={this.onClassChange}>
                  <option value="" selected hidden>
                    Choose Course
                  </option>
                  <option value="COEN 10">COEN 10</option>
                  <option value="COEN 11">COEN 11</option>
                  <option value="COEN 12">COEN 12</option>
                  <option value="COEN 20">COEN 20</option>
                  <option value="COEN 21">COEN 21</option>
                  <option value="COEN 44">COEN 44</option>
                  <option value="COEN 45">COEN 45</option>
                  <option value="COEN 60">COEN 60</option>
                  <option value="COEN 70">COEN 70</option>
                  <option value="COEN 79">COEN 79</option>
                  <option value="COEN 122">COEN 122</option>
                  <option value="COEN 123">COEN 123</option>
                  <option value="COEN 127">COEN 127</option>
                  <option value="COEN 146">COEN 146</option>
                  <option value="COEN 148">COEN 148</option>
                  <option value="COEN 152">COEN 152</option>
                  <option value="COEN 160">COEN 160</option>
                  <option value="COEN 161">COEN 161</option>
                  <option value="COEN 163">COEN 163</option>
                  <option value="COEN 164">COEN 164</option>
                  <option value="COEN 174">COEN 174</option>
                  <option value="COEN 175">COEN 175</option>
                  <option value="COEN 177">COEN 177</option>
                  <option value="COEN 178">COEN 178</option>
                </select>
              </div>
            </div>
            <div className="col-xs-6 col-sm-3" style={{ marginBottom: "15px" }}>
              <div style={{ margin: "0 20px" }}>
                <select id="test-day" onChange={this.onDayChange}>
                  <option value="" selected hidden>
                    Choose Day
                  </option>
                  <option value="M">Monday</option>
                  <option value="T">Tuesday</option>
                  <option value="W">Wednesday</option>
                  <option value="R">Thursday</option>
                  <option value="F">Friday</option>
                </select>
              </div>
            </div>
            <div className="col-xs-6 col-sm-3">
              <div />
              <div style={{ margin: "0 20px" }}>
                <div className="form-group">
                  <div className="input-group date" id="starttimepicker">
                    <TimePicker
                      showSecond={false}
                      placeholder={"Start Time"}
                      onChange={this.onStartTimeChange}
                      className="W-100"
                      format={"h:mm a"}
                      minuteStep={15}
                      use12Hours
                      inputReadOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-6 col-sm-3">
              <div style={{ margin: "0 20px" }}>
                <div className="form-group">
                  <div className="input-group date" id="endtimepicker">
                    <TimePicker
                      showSecond={false}
                      placeholder={"End Time"}
                      onChange={this.onEndTimeChange}
                      className="W-100"
                      format={"h:mm a"}
                      minuteStep={15}
                      use12Hours
                      inputReadOnly
                    />
                  </div>
                </div>
              </div>
              <button
                id="test-submit"
                style={{ float: "right", marginRight: "20px" }}
                onClick={this.listAvailableTAs}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {this.state.showList ? (
          <AvailableTaList teachingAssistants={this.state.teachingAssistants} />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default QueryPage;
