"use strict";

import React, { Component } from "react";
import ReactDOM from "react-dom";

import ReactSCarousel from "./react-s-carousel.jsx";

var list = [
  { href: "http://github.com/seckie1", imgSrc: "img/slide1.png", imgAlt: "Slide1 Alt" },
  { href: "http://github.com/seckie2", imgSrc: "img/slide2.png", imgAlt: "Slide2 Alt" },
  { href: "http://github.com/seckie3", imgSrc: "img/slide3.png", imgAlt: "Slide3 Alt" },
];


class App extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    var hStyle = {
      fontSize: 20,
      margin: "20px",
    };
//        <Carousel mode="slide" width={600} slideWidth={200} />
//        <Carousel mode="fade" />
    return (
      <div style={{ position: "relative" }}>
        <h2 style={hStyle}>
         mode="slide", width=600, slideWidth=200
        </h2>

        <h2 style={hStyle}>
        mode="slide" autoPlayIntervals=[1000,5000,2000]
        </h2>
        <Carousel mode="slide" autoPlayIntervals={[1000,5000,2000]}
        onChange={function(props) { console.info(props); }}
        onInit={function(props) {console.info('init ', props);}}
        duration={3000}
        />

        <h2 style={hStyle}>
        mode="fade"
        </h2>
      </div>
    );
  }
}

class Carousel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      autoPlay: true
    };
  }
  toggleAutoPlay () {
    this.setState({
      autoPlay: !this.state.autoPlay
    });
  }
  render () {
    var slides = list.map((slide, i) => {
      return (
        <a href={slide.href} key={`slide${i}`}>
        <img src={slide.imgSrc} alt={slide.imgAlt} width={this.props.slideWidth} /></a>
      );
    });
    var props = Object.assign({}, this.props);
    props.slides = slides;
    props.autoPlay = this.state.autoPlay;
    return (
      <div>
      <ReactSCarousel {...props} />
        <button className="toggle" onClick={this.toggleAutoPlay.bind(this)}>Toggle autoPlay</button>
      </div>
    );
  }
}


ReactDOM.render(
  <App />
, document.getElementById("app"));
