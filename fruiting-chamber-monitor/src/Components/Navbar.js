import React from "react";
import "./Navbar.css";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.loadLog = this.loadLog.bind(this);
    this.loadHome = this.loadHome.bind(this);
  }
  loadLog = (e) => {
    this.props.loadLog();
  };
  loadHome = (e) => {
    this.props.loadHome();
  };
  render() {
    return (
      <nav className="navbar  navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          <img
            src={process.env.PUBLIC_URL + "/viburnum-fruit.png"}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
            loading="lazy"
          />
          Fruiting Chamber Monitor
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <button onClick={this.loadHome}>Home</button>
            <button onClick={this.loadLog}>Log</button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
