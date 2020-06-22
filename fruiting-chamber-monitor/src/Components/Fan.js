import React from "react";
import "./Fan.css";

export default class Fan extends React.Component {
  render() {
    var fanOffImg = process.env.PUBLIC_URL + "/FanOff.png";
    var fanOnImg = process.env.PUBLIC_URL + "/FanOn.png";
    var fanStateName = this.props.fanState === 0 ? "Off" : "On";
    if (this.props.fanState === undefined) {
      return (
        <div>
          <h5 className="dis">{this.props.title}</h5>
          <div className="loading">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h5>{this.props.title}</h5>
          <div>
            <img
              src={this.props.fanState === 0 ? fanOffImg : fanOnImg}
              alt="Fan Off"
              width="200"
            />
            <h6 className={this.props.fanState === 0 ? "fanOff" : "fanOn"}>
              {fanStateName}
            </h6>
          </div>
        </div>
      );
    }
  }
}
