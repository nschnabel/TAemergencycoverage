import React, { Component } from "react";
import Course from "./Course";
import * as $ from "jquery";
import { SUCCESS } from "../../../constants";

class QualifiedCourses extends Component {
  state = {
    courses: {
      "COEN 10": false,
      "COEN 11": false,
      "COEN 12": false,
      "COEN 20": false,
      "COEN 21": false,
      "COEN 44": false,
      "COEN 45": false,
      "COEN 60": false,
      "COEN 70": false,
      "COEN 79": false,
      "COEN 122": false,
      "COEN 123": false,
      "COEN 127": false,
      "COEN 146": false,
      "COEN 148": false,
      "COEN 152": false,
      "COEN 160": false,
      "COEN 161": false,
      "COEN 163": false,
      "COEN 164": false,
      "COEN 174": false,
      "COEN 175": false,
      "COEN 177": false,
      "COEN 178": false
    }
  };

  componentDidMount = () => {
    this.props.onRef(this);
    const id = this.props.id;
    $.post(
      "http://nickschnabel.com/newserver.php",
      { query: "get-courses", username: id },
      response => {
        const data = JSON.parse(response);

        let newCourses = this.state.courses;

        for (let course of data.result) {
          newCourses[course] = true;
        }
        this.setState({ courses: newCourses });
      }
    );
  };

  setCourse = e => {
    let newCourses = this.state.courses;
    const course = e.target.id;
    newCourses[course] = !this.state.courses[course];
    this.setState({ courses: newCourses });
  };

  submitCourses = () => {
    const id = this.props.id;
    $.ajax({
      type: "POST",
      url: "http://nickschnabel.com/newserver.php",
      data: { query: "clear-courses", username: id },
      success: function(data) {},
      async: false
    });

    var check = SUCCESS;

    for (let course in this.state.courses) {
      if (this.state.courses[course]) {
        $.post(
          "http://nickschnabel.com/newserver.php",
          { query: "add-course", course: course, username: id },
          response => {
            var data = JSON.parse(response);
            check += data.status;
          }
        );
      }
    }

    if (check === SUCCESS) {
      alert("Qualified courses saved");
    }
  };

  render() {
    return (
      <div id="qualified-courses" style={{ width: "100%" }}>
        <div className="subtitle2">Courses Qualified to TA</div>
        <hr />
        <div className="container" style={{ width: "100%", marginTop: "25px" }}>
          <button
            onClick={this.submitCourses}
            id="add-course-submit"
            style={{ float: "right" }}
          >
            Save
          </button>
          <div
            className="col-xs-10 col-sm-8 col-sm-push-2"
            style={{ marginTop: "60px", marginBottom: "30px" }}
          >
            <table id="courses" style={{ width: "100%", marginLeft: "30px" }}>
              <tbody>
                <tr>
                  <td style={{ width: "25%" }}>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        {Object.keys(this.state.courses)
                          .slice(0, 6)
                          .map(course => (
                            <Course
                              checked={this.state.courses[course]}
                              id={course}
                              key={course}
                              setCourse={this.setCourse}
                            />
                          ))}
                      </tbody>
                    </table>
                  </td>
                  <td style={{ width: "25%" }}>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        {Object.keys(this.state.courses)
                          .slice(6, 12)
                          .map(course => (
                            <Course
                              checked={this.state.courses[course]}
                              id={course}
                              key={course}
                              setCourse={this.setCourse}
                            />
                          ))}
                      </tbody>
                    </table>
                  </td>
                  <td style={{ width: "25%" }}>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        {Object.keys(this.state.courses)
                          .slice(12, 18)
                          .map(course => (
                            <Course
                              checked={this.state.courses[course]}
                              id={course}
                              key={course}
                              setCourse={this.setCourse}
                            />
                          ))}
                      </tbody>
                    </table>
                  </td>
                  <td style={{ width: "25%" }}>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        {Object.keys(this.state.courses)
                          .slice(18, 24)
                          .map(course => (
                            <Course
                              checked={this.state.courses[course]}
                              id={course}
                              key={course}
                              setCourse={this.setCourse}
                            />
                          ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default QualifiedCourses;
