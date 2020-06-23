import React from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default class Log extends React.Component {
  state = { logData: "" };
  componentDidMount = async () => {
    const response = await axios.get("http://192.168.1.96:3000/logs");
    this.setState({ logData: response.data });
    console.log(response.data);
  };
  render() {
    return <div>Log Data {this.state.logData}</div>;
  }
}
