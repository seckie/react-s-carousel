"use strict";

import React, { Component } from "react";
import ReactDOM from "react-dom";

import ReactSCarousel from "./react-s-carousel.jsx";

var list = [
  { href: "http://github.com/seckie", imgSrc: "img/slide1.png", imgAlt: "Slide1 Alt" },
  { href: "http://github.com/seckie", imgSrc: "img/slide2.png", imgAlt: "Slide2 Alt" },
  { href: "http://github.com/seckie", imgSrc: "img/slide3.png", imgAlt: "Slide3 Alt" },
];

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
        <img src={slide.imgSrc} alt={slide.imgAlt} /></a>
      );
    });
    var props = {
      slides: slides,
      autoPlay: this.state.autoPlay,
      width: 800
    };
    return (
      <div>
        <ReactSCarousel {...props} />
        <button className="toggle" onClick={this.toggleAutoPlay.bind(this)}>Toggle autoPlay</button>
      </div>
    );
  }
}

export default Carousel;
