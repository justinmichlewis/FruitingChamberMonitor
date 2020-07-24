import React from "react";
import axios from "axios";
import Chart from "../Chart/Chart";
import Times from "../Times/Times";
import Modal from "../Modal/Modal";
import Fan from "../Fan/Fan";
import "./MainPage.css";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vitals: [{ temp: 0, humid: 0 }],
      schedule: [],
      scheudleUpdate: [],
      show: false,
      btnText: "Update Schedule",
      btnStyle: "btn btn-primary btn-lg",
      screen: "Home",
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
        //console.log(response.data);
        this.setState({ vitals: response.data });
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    //console.log(this.state.vitals);
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
    const iframe =
      '<iframe src="http://192.168.1.96:8000/index.html"></iframe>';
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 border">
              <Chart
                chartID="gauge-chart1"
                value={((this.state.vitals[0] * 9) / 5 + 32).toFixed(2)}
                title="Temperature"
                kind="t"
              />
            </div>
            <div className="col-lg-6 col-12 border">
              <Chart
                chartID="gauge-chart2"
                value={this.state.vitals[1]}
                title="Humidity"
                kind="h"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12 border">
              <Chart
                chartID="gauge-chart3"
                value={this.state.vitals[4]}
                title="CO2"
                kind="c"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12 border">
              <Fan fanState={this.state.vitals[2]} title="Fan 1 State" />
            </div>
            <div className="col-lg-6 col-12 border">
              <Fan fanState={this.state.vitals[3]} title="Fan 2 State" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12 border">
              <h5>Fan Duration:</h5> {this.state.schedule.duration} Minutes
            </div>
            <div className="col-lg-6 col-12 border">
              <Times times={this.state.schedule.times} />
            </div>
          </div>
          {renderModal()}
          <button
            type="button"
            className={this.state.btnStyle}
            onClick={(e) => {
              this.showModal();
            }}
          >
            {this.state.btnText}
          </button>
        </div>
      </div>
    );
  }
}

export default MainPage;
