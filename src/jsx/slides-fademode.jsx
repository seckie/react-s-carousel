"use strict";

import React, { Component, PropTypes } from "react";
import classnames from "classnames";

class Slides extends Component {
  constructor (props) {
    super(props);
  }
  onTransitionEnd () {
    this.props.onChange(this.props);
  }
  render () {
    var count = this.props.slides.length;
    var transition = `opacity ${this.props.duration}ms ${this.props.cssEase}`;
    var index = this.props.index;
    var prevIndex = index - 1 >= 0 ? index -1 : this.props.slides.length - 1;
    var slides = this.props.slides.map((slide, i) => {
      var isPrev = prevIndex === i;
      var isActive = index === i;
      var isNext = index === i - 1 || (0 === i && index >= count - 1);
      var cName = classnames("slide", {
        prev: isPrev,
        active: isActive,
        next: isNext
      });
      var style = {
        width: this.props.width,
        height: this.props.height,
        position: "absolute",
        top: 0,
        left: 0,
        opacity: isPrev || isNext ? 0 : 1,
        transition: transition
      };
      switch(true) {
        case isPrev:
          style.zIndex = this.props.count + 1;
          break;
        case isActive:
          style.zIndex = this.props.count;
          break;
        case isNext:
          style.zIndex = this.props.count - 1;
          break;
        default:
          style.zIndex = -9999;
      }
      return (
        <div key={`slide${i}`} className={cName}
          style={style} onClick={this.props.onClickSlide}>
          {slide}
        </div>
      );
    });
    var slidesStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: this.props.width * this.props.slides.length,
      backgroundColor: this.props.backgroundColor
    };
    return (
      <div className="scarousel-slides" style={slidesStyle}
        onTransitionEnd={this.onTransitionEnd.bind(this)}>
        {slides}
      </div>
    );
  }
}

Slides.propTypes = {
  slides         : PropTypes.array,
  width          : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height         : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  index          : PropTypes.number,
  count          : PropTypes.number,
  duration       : PropTypes.number,
  cssEase        : PropTypes.string,
  onClickSlide   : PropTypes.func,
  mode           : PropTypes.string,
  backgroundColor: PropTypes.string,
  onChange       : PropTypes.func
};
Slides.defaultProps = {
  slides         : [],
  width          : "auto",
  height         : "auto",
  index          : 0,
  count          : 0,
  duration       : 500,
  cssEase        : "ease-in-out",
  onClickSlide   : function () {},
  mode           : "slide",
  backgroundColor: "white",
  onChange       : function () {}
};


export default Slides;
