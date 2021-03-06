"use strict";

import React, { Component, PropTypes } from "react";
import _ from "lodash";
import classnames from "classnames";

class Slides extends Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    this.props.onInit(this.props);
  }
  componentDidUpdate (prevProps) {
    if (this.props.enableTransition === false) {
      _.defer(this.props.loop);
    }
  }
  onTransitionEnd () {
    this.props.onChange(this.props);
    this.props.onTransitionEnd();
  }
  render () {
    var slides = this.props.slides.map((slide, i) => {
      var cName = classnames("slide", {
        active: this.props.index === i
      });
      var style = {
        width: this.props.slideWidth,
        cssFloat: "left"
      };
      return (
        <div key={`slide${i}`} className={cName}
          style={style} onClick={this.props.onClickSlide}>
          {slide}
        </div>
      );
    });
    var transition = this.props.enableTransition ? `transform ${this.props.duration}ms ${this.props.cssEase}` : "none";
    var slidesStyle = {
      width: this.props.slideWidth * this.props.slides.length,
      transform: `translateX(${-this.props.slideWidth * this.props.index}px)`,
      transition: transition
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
  slideWidth     : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  index          : PropTypes.number,
  duration       : PropTypes.number,
  cssEase        : PropTypes.string,
  loop           : PropTypes.func,
  onClickSlide   : PropTypes.func,
  onTransitionEnd: PropTypes.func,
  onChange       : PropTypes.func,
  onInit         : PropTypes.func
};
Slides.defaultProps = {
  slides         : [],
  width          : "auto",
  slideWidth     : "auto",
  index          : 0,
  duration       : 500,
  cssEase        : "ease-in-out",
  loop           : function () {},
  onClickSlide   : function () {},
  onTransitionEnd: function () {},
  onChange       : function () {},
  onInit         : function () {}
};


export default Slides;
