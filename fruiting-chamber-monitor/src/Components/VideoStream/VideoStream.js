import React from "react";

class VideoStream extends React.Component {
  state = { curTime: "" };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString(),
      });
    }, 1000);
  }
  render() {
    return (
      <div>
        <div className="web-cam">
          <h5>Chamber Monitor</h5>
          <iframe
            src="http://192.168.1.96:8000/index.html"
            height="500"
            width="675"
            style={{ border: "none" }}
          ></iframe>
          <div>
            <label>{this.state.curTime}</label>
          </div>
        </div>
      </div>
    );
  }
}
export default VideoStream;
