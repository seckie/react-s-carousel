"use strict";

import React, { Component } from "react";
import ReactDOM from "react-dom";

import Carousel from "./wrapper.jsx";

class App extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    var hStyle = {
      fontSize: 20,
      margin: "20px",
    };
    return (
      <div style={{ position: "relative" }}>
        <h2 style={hStyle}>
         mode="slide", width=600, slideWidth=200
        </h2>
        <Carousel mode="slide" width={600} slideWidth={200} />

        <h2 style={hStyle}>
        mode="slide" autoPlayIntervals=[1000,5000,2000]
        </h2>
        <Carousel mode="slide" autoPlayIntervals={[1000,5000,2000]}/>

        <h2 style={hStyle}>
        mode="fade"
        </h2>
        <Carousel mode="fade" />
      </div>
    );
  }
}


ReactDOM.render(
  <App />
, document.getElementById("app"));
