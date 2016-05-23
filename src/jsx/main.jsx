"use strict";

import React, { Component } from "react";
import ReactDOM from "react-dom";

import Carousel from "./wrapper.jsx";

class App extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div>
        <Carousel mode="fade" />
      </div>
    );
  }
}


ReactDOM.render(
  <App />
, document.getElementById("app"));
