"use strict";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import Slides from "./Slides.jsx";

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
    var el = ReactDOM.findDOMNode(this);
    this.setState({
      width: el.clientWidth
    });
    if (this.state.playing) {
      setTimeout(this._tick.bind(this), this.props.autoPlayInterval);
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
    var slidesProps = {
      slides: this.props.slides,
      width: width,
      index: this.state.index
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
};
ReactSCarousel.defaultProps = {
  slides: [],
  arrows: true,
  initialSlide: 0,
  autoPlay: true,
  autoPlayInterval: 3000,
  width: 0,
};

export default ReactSCarousel;
