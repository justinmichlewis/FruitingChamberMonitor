import React from "react";
import "./Navbar.css";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.loadLog = this.loadLog.bind(this);
    this.loadHome = this.loadHome.bind(this);
    this.state = { homeCurrent: true };
  }
  loadLog = (e) => {
    this.setState({ homeCurrent: false });
    this.props.loadLog();
  };
  loadHome = (e) => {
    this.setState({ homeCurrent: true });
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
            <li className={this.state.curretn ? "nav-item active" : "nav-item"}>
              <a className="nav-link" href="#" onClick={this.loadHome}>
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li
              className={
                !this.state.homeCurrent ? "nav-item active" : "nav-item"
              }
            >
              <a className="nav-link" href="#" onClick={this.loadLog}>
                Log
              </a>
            </li>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
