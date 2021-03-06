import React from "react";
import axios from "axios";
import "./Modal.css";

export default class Modal extends React.Component {
  state = { duration: 0, times: 0, threshold: 0 };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: parseInt(value) });
    //console.log(this.state);
  };

  saveSettings = async () => {
    console.log(this.state);
    if (this.state.duration === 0 || this.state.times === 0) {
      alert("Values Cannot Be Blank");
    } else {
      const response = await axios.post(
        "http://192.168.1.96:3000/schedule",
        this.state
      );

      //Call back function for parent GET updated schedule from server and save to state
      this.props.fetch();
    }
  };
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div>
        <label>Duration(Min):</label>
        <input
          type="text"
          id="fname"
          name="duration"
          onChange={this.handleUserInput}
        />
        <label>Times a Day to Run Fan:</label>
        <input
          type="text"
          id="lname"
          name="times"
          onChange={this.handleUserInput}
        />
        <label>CO2 Threshold:</label>
        <input
          type="text"
          id="lname"
          name="threshold"
          onChange={this.handleUserInput}
        />
        <button className="btn btn-success" onClick={this.saveSettings}>
          Save
        </button>
      </div>
    );
  }
}
