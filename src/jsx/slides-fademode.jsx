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
  render () {
    console.log('this.props.index:', this.props.index);
    var count = this.props.slides.length;
    var transition = this.props.enableTransition ? `opacity ${this.props.duration}ms ${this.props.cssEase}` : "none";
    var slides = this.props.slides.map((slide, i) => {
      var isPrev = this.props.index - 1 === i;
      var isActive = this.props.index === i;
      var isNext = this.props.index === i - 1 || (0 === i && this.props.index >= count - 1);
      var cName = classnames("slide", {
        prev: isPrev,
        active: isActive,
        next: isNext
      });
      var style = {
        width: this.props.width,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: count - i,
        opacity: isActive ? 1 : 0,
        transition: transition
      };
      return (
        <div key={`slide${i}`} className={cName}
          style={style} onClick={this.props.onClickSlide}>
          {slide}
        </div>
      );
    });
    var slidesStyle = {
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
  width          : React.PropTypes.number,
  index          : React.PropTypes.number,
  duration       : React.PropTypes.number,
  cssEase        : React.PropTypes.string,
  loop           : React.PropTypes.func,
  onClickSlide   : React.PropTypes.func,
  onTransitionEnd: React.PropTypes.func,
  mode           : React.PropTypes.string,
  backgroundColor: React.PropTypes.string
};
Slides.defaultProps = {
  slides         : [],
  width          : 0,
  index          : 0,
  duration       : 500,
  cssEase        : "ease-in-out",
  loop           : function () {},
  onClickSlide   : function () {},
  onTransitionEnd: function () {},
  mode           : "slide",
  backgroundColor: "white"
};


export default Slides;
