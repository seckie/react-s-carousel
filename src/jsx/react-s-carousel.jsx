"use strict";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import Slides from "./Slides.jsx";

var timer;

class ReactSCarousel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      index: props.initialSlide + 1, // +1 looking cloned slide
      playing: props.autoPlay,
      enableTransition: true
    };
  }
  componentDidMount () {
    var el = ReactDOM.findDOMNode(this);
    this.setState({
      width: el.clientWidth
    });
    if (this.state.playing) {
      timer = setTimeout(this._tick.bind(this), this.props.autoPlayInterval);
    }
  }

  _tick () {
    if (!this.state.playing) {
      clearTimeout(timer);
      return;
    }
    this._updateIndex(1);
    timer = setTimeout(this._tick.bind(this), this.props.autoPlayInterval);
  }
  _updateIndex (tick) {
    var index = this.state.index + tick;
    var min = 0;
    var max = this.props.slides.length - 1 + 2; // +2 is cloned slides
    if (index < min) {
      index = max;
    } else if (max < index) {
      index = min;
    }
    this.setState({ index: index });
  }
  _updateStateOnClick () {
    this.setState({
      playing: false,
      enableClick: false
    });
  }
  onClickNext () {
    if (this.state.enableClick) {
      this._updateIndex(1);
      this._updateStateOnClick();
    }
  }
  onClickPrev () {
    if (this.state.enableClick) {
      this._updateIndex(-1);
      this._updateStateOnClick();
    }
  }
  loop () {
    this.setState({
      enableTransition: true
    });
  }
  onTransitionEnd () {
    var state = {
      enableClick: true,
      playing: true
    };
    var min = 0;
    var max = this.props.slides.length - 1 + 2; // +2 is cloned slides
    if (this.state.index <= min) {
      state.index = max - 1;
      state.enableTransition = false;
    } else if (max <= this.state.index) {
      state.index = min + 1;
      state.enableTransition = false;
    } else {
      state.enableTransition = true;
    }
    if (!this.state.playing) {
      clearTimeout(timer);
      timer = setTimeout(this._tick.bind(this), this.props.autoPlayInterval);
    }
    this.setState(state);
  }
  render () {
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

    var width = this.state.width || this.props.width;
    var style = {
      width: width || "100%",
      overflow: "hidden"
    };
    var firstSlide = this.props.slides[0];
    var lastSlide = this.props.slides[this.props.slides.length - 1];
    var slides = [].concat(lastSlide, this.props.slides, firstSlide);
    var slidesProps = {
      slides: slides,
      width: width,
      index: this.state.index,
      duration: this.props.duration,
      cssEase: this.props.cssEase,
      loop: this.loop.bind(this),
      onTransitionEnd: this.onTransitionEnd.bind(this),
      enableTransition: this.state.enableTransition,
    };
    return (
      <div className="scarousel" style={style}>
        <Slides {...slidesProps} />
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
  width: React.PropTypes.number,
  duration: React.PropTypes.number,
  cssEase: React.PropTypes.string,
};
ReactSCarousel.defaultProps = {
  slides: [],
  arrows: true,
  initialSlide: 0,
  autoPlay: true,
  autoPlayInterval: 3000,
  width: 0,
  duration: 500,
  cssEase: "ease-in-out",
};

export default ReactSCarousel;
