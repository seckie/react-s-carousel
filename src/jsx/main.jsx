"use strict";

import React from "react";
import ReactDOM from "react-dom";

import ReactSCarousel from "./react-s-carousel.jsx";

var slides = [
  { href: "http://github.com/seckie", imgSrc: "img/slide1.png", imgAlt: "Slide1 Alt" },
  { href: "http://github.com/seckie", imgSrc: "img/slide2.png", imgAlt: "Slide2 Alt" },
  { href: "http://github.com/seckie", imgSrc: "img/slide3.png", imgAlt: "Slide3 Alt" },
];

ReactDOM.render(
  <ReactSCarousel slides={slides} />
, document.getElementById("app"));
