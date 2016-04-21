"use strict";

import React, { Component } from "react";
import classnames from "classnames";

class Slides extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    var slides = this.props.slides.map((slide, i) => {
      var cName = classnames("slide", {
        active: this.props.index === i
      });
      var style = {
        width: this.props.width,
        float: "left"
      };
      return (
        <div key={`slide${i}`} className={cName} style={style}>
        <a href={slide.href}>
        <img src={slide.imgSrc} alt={slide.imgAlt} />
        </a>
        </div>
      );
    });
    var slidesStyle = {
      width: this.props.width * this.props.slides.length,
      transform: `translateX(${-this.props.width * this.props.index}px)`,
    };
    return (
      <div className="scarousel-slides" style={slidesStyle}>
      {slides}
      </div>
    );
  }
}

Slides.propTypes = {
  slides: React.PropTypes.array,
  width: React.PropTypes.number,
  index: React.PropTypes.number,
};
Slides.defaultProps = {
  slides: [],
  width: 0,
  index: 0,
};


export default Slides;
