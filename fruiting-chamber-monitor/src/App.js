import React from "react";
import axios from "axios";
import Chart from "./Components/Chart";
import Times from "./Components/Times";
import Modal from "./Components/Modal";
import Navbar from "./Components/Navbar";
import Fan from "./Components/Fan";
import "./App.css";
//rtsp://MushCam:Jlewis13@192.168.1.78/live

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vitals: [{ temp: 0, humid: 0 }],
      schedule: [],
      scheudleUpdate: [],
      show: false,
      btnText: "Update Schedule",
      btnStyle: "btn btn-primary btn-lg",
    };
  }
  fetchSchedule = async () => {
    const response = await axios.get("http://192.168.1.96:3000/schedule");
    this.setState({ schedule: response.data });
  };

  showModal = (e) => {
    let text = this.state.show ? "Update Schedule" : "Close";
    let style = this.state.show
      ? "btn btn-primary btn-lg"
      : "btn btn-secondary";

    this.setState({
      show: !this.state.show,
      btnText: text,
      btnStyle: style,
    });
  };

  componentDidMount = async () => {
    const response = await axios.get("http://192.168.1.96:3000/schedule");
    this.setState({ schedule: response.data });

    try {
      setInterval(async () => {
        const response = await axios.get("http://192.168.1.96:3000/vitals");

        this.setState({ vitals: response.data });
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    console.log(this.state.vitals);
    const renderModal = () => {
      return (
        <Modal
          onClose={this.showModal}
          show={this.state.show}
          duration={this.state.schedule.duration}
          times={this.state.schedule.times}
          fetch={this.fetchSchedule}
        />
      );
    };

    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div class="col-lg-6 col-12 border">
              <Chart
                chartID="gauge-chart1"
                value={((this.state.vitals[0] * 9) / 5 + 32).toFixed(2)}
                title="Temperature"
                kind="t"
              />
            </div>
            <div class="col-lg-6 col-12 border">
              <Chart
                chartID="gauge-chart2"
                value={this.state.vitals[1]}
                title="Humidity"
                kind="h"
              />
            </div>
          </div>
          <div className="row">
            <div class="col-lg-6 col-12 border">
              <Fan fanState={this.state.vitals[2]} title="Fan 1 State" />
            </div>
            <div class="col-lg-6 col-12 border">
              <Fan fanState={this.state.vitals[3]} title="Fan 2 State" />
            </div>
          </div>
          <div className="row">
            <div class="col-lg-6 col-12 border">
              <h5>Fan Duration:</h5> {this.state.schedule.duration} Minutes
            </div>
            <div class="col-lg-6 col-12 border">
              <Times times={this.state.schedule.times} />
            </div>
          </div>
          {renderModal()}
          <button
            type="button"
            class={this.state.btnStyle}
            onClick={(e) => {
              this.showModal();
            }}
          >
            {this.state.btnText}
          </button>
        </div>
        <footer class="footer">Justin Lewis | 2 0 2 0</footer>
      </div>
    );
  }
}

export default App;
