"use strict";

import React, { Component } from "react";
import ReactDOM from "react-dom";

import Carousel from "./wrapper.jsx";

const COUNT = 3;

class App extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    var carousels = [];
    for (var i=0; i<COUNT; i++) {
      carousels.push(<Carousel key={`item${i}`} />);
    }
    return (
      <div>
        {carousels}
      </div>
    );
  }
}


ReactDOM.render(
  <App />
, document.getElementById("app"));
