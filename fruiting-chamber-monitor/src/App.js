import React from "react";
import Navbar from "./Components/Navbar";
import MainPage from "./Components/MainPage";
import Log from "./Components/Log";
//import Log from "./Components/Log";
import "./App.css";
//rtsp://MushCam:Jlewis13@192.168.1.78/live

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: "Home",
    };
  }

  loadLog = () => {
    this.setState({ screen: "Log" });
  };

  loadHome = () => {
    this.setState({ screen: "Home" });
  };

  render() {
    if (this.state.screen === "Home") {
      return (
        <div>
          <Navbar loadLog={this.loadLog} loadHome={this.loadHome} />
          <MainPage />
          <footer className="footer">Justin Lewis | 2 0 2 0</footer>
        </div>
      );
    } else if (this.state.screen === "Log") {
      return (
        <div>
          <Navbar loadLog={this.loadLog} loadHome={this.loadHome} />
          <Log />
          <footer className="footer">Justin Lewis | 2 0 2 0</footer>
        </div>
      );
    }
  }
}

export default App;
