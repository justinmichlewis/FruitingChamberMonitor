import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import MainPage from "./Components/MainPage/MainPage";
import Log from "./Components/Log/Log";
import VideoStream from "./Components/VideoStream/VideoStream";
import "./App.css";

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

  loadVideo = () => {
    this.setState({ screen: "Video" });
  };

  render() {
    if (this.state.screen === "Home") {
      return (
        <div>
          <Navbar
            loadLog={this.loadLog}
            loadHome={this.loadHome}
            loadVideo={this.loadVideo}
          />
          <MainPage />
          <footer className="footer">Justin Lewis | 2 0 2 0</footer>
        </div>
      );
    } else if (this.state.screen === "Log") {
      return (
        <div>
          <Navbar
            loadLog={this.loadLog}
            loadHome={this.loadHome}
            loadVideo={this.loadVideo}
          />
          <Log />
          <footer className="footer">Justin Lewis | 2 0 2 0</footer>
        </div>
      );
    } else if (this.state.screen === "Video") {
      return (
        <div>
          <Navbar
            loadLog={this.loadLog}
            loadHome={this.loadHome}
            loadVideo={this.loadVideo}
          />
          <VideoStream />
          <footer className="footer">Justin Lewis | 2 0 2 0</footer>
        </div>
      );
    }
  }
}

export default App;
