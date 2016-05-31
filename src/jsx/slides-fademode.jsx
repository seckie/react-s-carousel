"use strict";

import React, { Component } from "react";
import _ from "lodash";
import classnames from "classnames";

class Slides extends Component {
  constructor (props) {
    super(props);
  }
  componentDidUpdate (prevProps) {
    if (!this.props.enableTransition) {
      _.defer(this.props.loop);
    }
  }
  onTransitionEnd (e) {
    var el = e.currentTarget;
    if (el.style.opacity == 0) {
      el.style.display = "none";
    }
  }
  render () {
    var count = this.props.slides.length;
    var transition = this.props.enableTransition ? `opacity ${this.props.duration}ms ${this.props.cssEase}` : "none";
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
        opacity: isActive ? 1 : 0,
        display: isPrev || isActive ? "block" : "none",
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
          style.zIndex = 9999;
      }
      return (
        <div key={`slide${i}`} className={cName}
          style={style} onClick={this.props.onClickSlide}
          onTransitionEnd={this.onTransitionEnd.bind(this)}>
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
      <div className="scarousel-slides" style={slidesStyle}>
        {slides}
      </div>
    );
  }
}

Slides.propTypes = {
  slides         : React.PropTypes.array,
  width          : React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  height         : React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  index          : React.PropTypes.number,
  count          : React.PropTypes.number,
  duration       : React.PropTypes.number,
  cssEase        : React.PropTypes.string,
  loop           : React.PropTypes.func,
  onClickSlide   : React.PropTypes.func,
  onTransitionEnd: React.PropTypes.func,
  mode           : React.PropTypes.string,
  backgroundColor: React.PropTypes.string,
};
Slides.defaultProps = {
  slides         : [],
  width          : "auto",
  height         : "auto",
  index          : 0,
  count          : 0,
  duration       : 500,
  cssEase        : "ease-in-out",
  loop           : function () {},
  onClickSlide   : function () {},
  onTransitionEnd: function () {},
  mode           : "slide",
  backgroundColor: "white"
};


export default Slides;
