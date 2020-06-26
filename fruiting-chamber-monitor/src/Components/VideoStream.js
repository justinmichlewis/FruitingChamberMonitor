import React from "react";

class VideoStream extends React.Component {
  render() {
    return (
      <div>
        <div className="web-cam">
          <h5>Chamber Monitor</h5>
          <iframe
            src="http://192.168.1.96:8000/index.html"
            height="500"
            width="675"
          ></iframe>
        </div>
      </div>
    );
  }
}
export default VideoStream;
