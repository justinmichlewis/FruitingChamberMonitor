import React from "react";
import axios from "axios";

export default class Log extends React.Component {
  state = { logDataArr: [] };
  componentDidMount = async () => {
    const response = await axios.get("http://192.168.1.96:3000/logs");
    console.log(response.data);
    this.setState({ logDataArr: response.data.split(";") });
  };
  render() {
    return (
      <div>
        <h2>Log Data</h2>
        {this.state.logDataArr.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    );
  }
}
