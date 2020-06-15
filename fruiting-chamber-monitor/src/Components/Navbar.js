import React from "react";
const Navbar = (props) => {
  return (
    <nav class="navbar  navbar-dark bg-primary">
      <a class="navbar-brand" href="#">
        <img
          src={process.env.PUBLIC_URL + "/viburnum-fruit.png"}
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
        Fruiting Chamber Monitor
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">
            Temp 1 <span class="sr-only">(current)</span>
          </a>
          <a
            class="nav-item nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >
            Temp 2
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
