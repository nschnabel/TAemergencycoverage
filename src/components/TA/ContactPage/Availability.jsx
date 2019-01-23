import React, { Component } from "react";
import { SUCCESS } from "../../../constants";
import * as $ from "jquery";

class Availability extends Component {
  state = {
    mouseDown: false
  };

  componentDidMount = () => {
    this.props.onRef(this);
    const self = this;
    self.setState({ mouseDown: false });

    let highlighted;

    $("table#availability-table td.selectable")
      .mousedown(function() {
        self.setState({ mouseDown: true });
        highlighted = $(this).hasClass("highlighted");

        if (highlighted) {
          $(this).removeClass("highlighted");
        } else {
          $(this).addClass("highlighted");
        }
        return false; // prevent text selection
      })
      .mouseover(function() {
        if (self.state.mouseDown) {
          if (highlighted) {
            $(this).removeClass("highlighted");
          } else {
            $(this).addClass("highlighted");
          }
        }
      })
      .bind("selectstart", function() {
        return false; // prevent text selection in IE
      });

    const id = this.props.id;
    console.log(id);
    $.post(
      "http://nickschnabel.com/newserver.php",
      { query: "get-availability", username: id },
      response => {
        const data = JSON.parse(response);

        const days = ["M", "T", "W", "R", "F"];

        for (let i = 0; i < 5; i++) {
          let t_hours = "08:00:00";
          let highlighted = false;
          let k = i + 1;

          $("#availability-table tr td:nth-child(" + k + ")").each(function() {
            if (highlighted == true) {
              $(this).addClass("highlighted");
            } else {
              $(this).removeClass("highlighted");
            }

            for (let j = 0; j < data.result.length; j++) {
              if (
                data.result[j].day == days[i] &&
                data.result[j].t_start == t_hours
              ) {
                $(this).addClass("highlighted");
                highlighted = true;
                break;
              }
              if (
                data.result[j].day == days[i] &&
                data.result[j].t_end == t_hours
              ) {
                highlighted = false;
                $(this).removeClass("highlighted");
              }
            }
            t_hours = self.props.addToTime(t_hours);
            let time = t_hours;
            if (Number(time.match(/^(\d+)/)[1]) < 10) {
              t_hours = "0" + t_hours;
            }
          });
        }
      }
    );
  };

  mouseIsDown = e => {
    this.setState({ mouseDown: true });
  };

  mouseIsUp = e => {
    this.setState({ mouseDown: false });
  };

  submitAvailability = () => {
    const self = this;
    const id = this.props.id;
    $.ajax({
      type: "POST",
      url: "http://nickschnabel.com/newserver.php",
      data: { query: "clear-availability", username: id },
      success: function(data) {},
      async: false
    });

    const days = ["M", "T", "W", "R", "F"];
    let check = SUCCESS;

    for (let i = 0; i < 5; i++) {
      let t_hours = "8:00";
      let t_start = "";
      let t_end = "";
      let highlighted = false;
      let k = i + 1;

      $("#availability-table tr td:nth-child(" + k + ")").each(function() {
        if ($(this).hasClass("highlighted")) {
          if (highlighted == false) {
            highlighted = true;
            t_start = t_hours;
          }
        } else {
          if (highlighted == true) {
            highlighted = false;
            t_end = t_hours;
            console.log(t_start, t_end, days[i]);
            $.post(
              "http://nickschnabel.com/newserver.php",
              {
                query: "add-time",
                day: days[i],
                t_start: t_start,
                t_end: t_end,
                username: id
              },
              response => {
                const data = JSON.parse(response);
                check += data.status;
              }
            );
          }
        }
        t_hours = self.props.addToTime(t_hours);
      });

      if (highlighted == true) {
        t_end = t_hours;

        $.post(
          "http://nickschnabel.com/newserver.php",
          {
            query: "add-time",
            day: days[i],
            t_start: t_start,
            t_end: t_end,
            username: id
          },
          response => {
            const data = JSON.parse(response);
            check += data.status;
          }
        );
      }
    }

    if (check === SUCCESS) {
      alert("Availability saved");
    }
  };

  render() {
    return (
      <div>
        <div className="subtitle2">Your Availability</div>

        <hr />
        <div className="container" style={{ width: "100%", marginTop: "25px" }}>
          <button
            onClick={this.submitAvailability}
            id="test-save-time"
            style={{ float: "right" }}
          >
            Save
          </button>

          <div className="row">
            <div
              id="availability"
              style={{ marginTop: "60px" }}
              className="col-xs-11 col-sm-9 col-sm-push-1"
            >
              <table
                cellpadding="0"
                style={{ float: "left" }}
                cellspacing="0"
                id="time-table"
                width="15%"
              >
                <th />
                <tr>
                  <td>
                    <div>8:00 AM</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>9:00 AM</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>10:00 AM</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>11:00 AM</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>12:00 PM</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>1:00 PM</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>2:00 PM</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>3:00 PM</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>4:00 PM</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>5:00 PM</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>6:00 PM</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>7:00 PM</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>8:00 PM</div>
                  </td>
                </tr>
              </table>

              <table
                cellpadding="0"
                cellspacing="0"
                style={{ float: "left" }}
                id="availability-table"
                width="85%"
                onMouseDown={e => this.mouseIsDown(e)}
                onMouseUp={e => this.mouseIsUp(e)}
              >
                <thead>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                </thead>
                <tr className="table-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="mid-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="table-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="mid-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="table-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="mid-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="table-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="mid-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="table-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="mid-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="table-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="mid-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="table-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="mid-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="table-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="mid-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="table-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="mid-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="table-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="mid-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="table-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="mid-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="table-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr className="mid-border">
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                  <td className="selectable"> </td>
                </tr>
                <tr>
                  <td
                    className="selectable"
                    style={{ borderBottom: "2px solid #c4c4c4" }}
                  >
                    {" "}
                  </td>
                  <td
                    className="selectable"
                    style={{ borderBottom: "2px solid #c4c4c4" }}
                  >
                    {" "}
                  </td>
                  <td
                    className="selectable"
                    style={{ borderBottom: "2px solid #c4c4c4" }}
                  >
                    {" "}
                  </td>
                  <td
                    className="selectable"
                    style={{ borderBottom: "2px solid #c4c4c4" }}
                  >
                    {" "}
                  </td>
                  <td
                    className="selectable"
                    style={{ borderBottom: "2px solid #c4c4c4" }}
                  >
                    {" "}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <br />
          <div style={{ marginTop: "20px" }}>
            <button id="test-clear-data">Clear Availability</button>
          </div>

          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default Availability;
