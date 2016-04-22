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
    var slides = this.props.slides.map((slide, i) => {
      var cName = classnames("slide", {
        active: this.props.index === i
      });
      var style = {
        width: this.props.width,
        float: "left"
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
      width: this.props.width * this.props.slides.length,
      transform: `translateX(${-this.props.width * this.props.index}px)`,
      transition: transition
    };
    return (
      <div className="scarousel-slides" style={slidesStyle}
        onTransitionEnd={this.props.onTransitionEnd}>
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
};


export default Slides;
