"use strict";

import React from "react";
import ReactDOM from "react-dom";

import ReactSCarousel from "./react-s-carousel.jsx";

var slides = [
  { href: "http://github.com/seckie", imgsrc: "img/slide1.png", imgalt: "Slide1 Alt" },
  { href: "http://github.com/seckie", imgsrc: "img/slide2.png", imgalt: "Slide2 Alt" },
  { href: "http://github.com/seckie", imgsrc: "img/slide3.png", imgalt: "Slide3 Alt" },
];

ReactDOM.render(
  <ReactSCarousel slides={slides} />
, document.getElementById("app"));
