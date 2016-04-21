"use strict";

import React, { Component } from "react";
import classnames from "classnames";

var timer;

class ReactSCarousel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      index: props.initialSlide,
      playing: props.autoPlay,
    };
  }
  componentDidMount () {
    if (this.state.playing) {
      this._tick();
    }
  }

  _tick () {
    if (!this.state.playing) {
      clearTimeout(timer);
      return;
    }
    this._updateIndex(1);
    setTimeout(this._tick.bind(this), this.props.autoPlayInterval);
  }
  _updateIndex (tick) {
    var index = this.state.index + tick;
    var min = 0;
    var max = this.props.slides.length - 1;
    if (index < min) {
      index = max;
    } else if (max < index) {
      index = min;
    }
    this.setState({ index: index });
  }
  onClickNext () {
    this._updateIndex(1);
  }
  onClickPrev () {
    this._updateIndex(-1);
  }
  render () {
    var slides = this.props.slides.map((slide, i) => {
      var cName = classnames("slide", {
        active: this.state.index === i
      });
      return (
        <div className={cName}>
        <a href={slide.href}>
        <img src={slide.imgSrc} alt={slide.imgAlt} />
        </a>
        </div>
      );
    });
    if (this.props.arrows) {
      var nextArrow = (
        <button className="arrow next" onClick={this.onClickNext.bind(this)}>
          Next</button>
      );
      var prevArrow = (
        <button className="arrow prev" onClick={this.onClickPrev.bind(this)}>
          Prev</button>
      );
    }
    return (
      <div className="scarousel">
        <div className="scarousel-slides">
        {slides}
        </div>
        {nextArrow}
        {prevArrow}
      </div>
    );
  }
}

ReactSCarousel.propTypes = {
  slides: React.PropTypes.array,
  arrows: React.PropTypes.bool,
  initialSlide: React.PropTypes.number,
  autoPlay: React.PropTypes.bool,
  autoPlayInterval: React.PropTypes.number,
};
ReactSCarousel.defaultProps = {
  slides: [],
  arrows: true,
  initialSlide: 0,
  autoPlay: true,
  autoPlayInterval: 3000,
};

export default ReactSCarousel;
