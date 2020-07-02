import React from "react";
import axios from "axios";
import "./Log.css";

//THIS IS DOGSHIT IMPLEMENTED NEEDS REFACTORING
export default class Log extends React.Component {
  state = { logDataArr: [] };
  componentDidMount = async () => {
    const response = await axios.get("http://192.168.1.96:3000/logs");
    this.setState({
      logDataArr: response.data.split(";"),
      tableData: this.formatLog(response.data.split(";")),
      priorTableData: [],
      sortButton: "Sort Acc",
      errButton: "btn btn-secondary",
    });
  };

  formatLog = (logs) => {
    const finalLogArray = [];
    //length - 1 since there's a final ; that creates a undefind line in
    //the logDataArr
    for (let index = 0; index < logs.length - 1; index++) {
      //Get log line by line to parse into a object to push into the final array
      const line = logs[index];

      const lineArr = line.split("|");
      //convert string into an array of ints .map((x) => +x); converts str to int in the arr
      const rt = lineArr[4]
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map((x) => +x);

      //Shit code for a error case when the lenght of the first row is 21 and the rest are 22
      let st = "";
      if (lineArr[0].length === 21) {
        st = parseInt(lineArr[0].substring(12, 19));
      } else {
        st = parseInt(lineArr[0].substring(13, 15));
      }

      //COVNERT STRING DATES TO DATES AND FIND DIFFERENCE
      finalLogArray.push({
        startTime: lineArr[0],
        endTime: lineArr[1],
        actDurr: lineArr[2].substring(3, 5),
        schedDurr: lineArr[3],
        runTimes: lineArr[4],
        durrErr:
          parseInt(lineArr[3]) - parseInt(lineArr[2].substring(3, 5)) === 0
            ? "OK"
            : "ERROR",
        rtErr: rt.includes(st) ? "OK" : "ERROR",
      });
    }

    let baseKeys = Object.keys(finalLogArray);
    let logsArray = baseKeys.reduce((allLogs, currentKey) => {
      allLogs.push(finalLogArray[currentKey]);
      return allLogs;
    }, []);

    return logsArray;
  };

  renderTableData = () => {
    //Check if tableData has been loaded
    if (this.state.tableData === undefined) {
      return <div>loading</div>;
    } else {
      const tableDataR = this.state.tableData;
      //console.log("RTD3", tableDataR);
      return tableDataR.map((logItem, index) => {
        const {
          startTime,
          endTime,
          schedDurr,
          actDurr,
          runTimes,
          durrErr,
          rtErr,
        } = logItem; //destructuring

        return (
          <tr key={index}>
            <td>{startTime}</td>
            <td>{endTime}</td>
            <td>{actDurr}</td>
            <td>{schedDurr}</td>
            <td>{runTimes}</td>
            <td
              style={durrErr === "OK" ? { color: "green" } : { color: "red" }}
            >
              {durrErr}
            </td>
            <td style={rtErr === "OK" ? { color: "green" } : { color: "red" }}>
              {rtErr}
            </td>
          </tr>
        );
      });
    }
  };

  //Just transposing the array
  sortTable = () => {
    let startIndex = this.state.tableData.length - 1;
    let transArr = [];

    for (let index = 0; index < this.state.tableData.length; index++) {
      transArr[index] = this.state.tableData[startIndex];
      startIndex -= 1;
    }
    this.setState({ tableData: transArr });
  };

  sortClick = (e) => {
    this.sortTable();
    if (e.target.innerHTML === "Sort Acc") {
      this.setState({ sortButton: "Sort Dec" });
    } else {
      this.setState({ sortButton: "Sort Acc" });
    }
  };

  errClick = (e) => {
    if (this.state.errButton === "btn btn-danger") {
      this.setState({
        errButton: "btn btn-secondary",
        tableData: this.state.priorTableData,
      });
    } else {
      const errArr = [];

      for (let index = 0; index < this.state.tableData.length; index++) {
        if (this.state.tableData[index].durrErr === "ERROR") {
          errArr[index] = this.state.tableData[index];
        }
      }

      this.setState({
        priorTableData: this.state.tableData, //Retain prior table data
        tableData: errArr,
        errButton: "btn btn-danger",
      });
    }
  };

  render() {
    return (
      <div>
        <h5>Log Data</h5>
        <button
          type="button"
          id="sort"
          className="btn btn-primary"
          onClick={this.sortClick}
        >
          {this.state.sortButton}
        </button>
        <button
          type="button"
          id="err"
          className={this.state.errButton}
          onClick={this.errClick}
        >
          Toggle Errors
        </button>
        <table id="logs">
          <tbody>
            <tr>
              <th key="1">Start Time</th>
              <th key="2">End Time</th>
              <th key="3">Act Durr</th>
              <th key="4">Sched Durr</th>
              <th key="4">Run Times</th>
              <th key="5">Durr Error</th>
              <th key="6">Run Time Error</th>
            </tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}
