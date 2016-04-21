"use strict";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import classnames from "classnames";
import Slides from "./Slides.jsx";

var timer;
var prefix = "scarousel";

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
  componentWillUpdate (nextProps) {
    if (this.props.autoPlay !== nextProps.autoPlay) {
      this.setState({
        playing: nextProps.autoPlay
      });
      if (nextProps.autoPlay) {
        clearTimeout(timer);
        timer = setTimeout(this._tick.bind(this), this.props.autoPlayInterval);
      }
    }
  }

  _tick () {
    if (!this.state.playing) {
      clearTimeout(timer);
      return;
    }
    var index = this.state.index + 1;
    this._updateIndex(index);
    timer = setTimeout(this._tick.bind(this), this.props.autoPlayInterval);
  }
  _updateIndex (index) {
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
      var index = this.state.index + 1;
      this._updateIndex(index);
      this._updateStateOnClick();
    }
  }
  onClickPrev () {
    if (this.state.enableClick) {
      var index = this.state.index - 1;
      this._updateIndex(index);
      this._updateStateOnClick();
    }
  }
  onClickDot (e) {
    if (this.state.enableClick) {
      var index = +e.currentTarget.dataset.index;
      if (index !== this.state.index) {
        this._updateIndex(index);
        this._updateStateOnClick();
      }
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
      var isAfterClick = this.state.enableClick === false;
      var shouldBePause = isAfterClick && this.props.pauseOnAction;
      if (this.props.autoPlay && !shouldBePause) {
        timer = setTimeout(this._tick.bind(this), this.props.autoPlayInterval);
      }
    }
    this.setState(state);
  }
  render () {
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

    if (this.props.dots) {
      var dots = slides.map((slide, i) => {
        if (i === 0 || slides.length - 1 <= i) {
          return "";
        }
        var cName = classnames(`${prefix}-dot`, {
          active: this.state.index === i
        });
        return (
          <button className={cName} key={`dot${i}`}
            data-index={i}
            onClick={this.onClickDot.bind(this)}>{i}</button>
        );
      });
    }
    if (this.props.arrows) {
      var prevArrow = (
        <button className={`${prefix}-arrow prev`}
          onClick={this.onClickPrev.bind(this)}>
          Prev</button>
      );
      var nextArrow = (
        <button className={`${prefix}-arrow next`}
          onClick={this.onClickNext.bind(this)}>
          Next</button>
      );
    }
    return (
      <div className="scarousel" style={style}>
        <Slides {...slidesProps} />
        {prevArrow}
        {nextArrow}
        <div className={`${prefix}-dots`}>
          {dots}
        </div>
      </div>
    );
  }
}

ReactSCarousel.propTypes = {
  arrows          : React.PropTypes.bool,
  autoPlay        : React.PropTypes.bool,
  autoPlayInterval: React.PropTypes.number,
  cssEase         : React.PropTypes.string,
  dots            : React.PropTypes.bool,
  duration        : React.PropTypes.number,
  initialSlide    : React.PropTypes.number,
  pauseOnAction   : React.PropTypes.bool,
  slides          : React.PropTypes.array,
  width           : React.PropTypes.number,
};
ReactSCarousel.defaultProps = {
  arrows          : true,
  autoPlay        : true,
  autoPlayInterval: 3000,
  cssEase         : "ease-in-out",
  dots            : true,
  duration        : 500,
  initialSlide    : 0,
  pauseOnAction   : true,
  slides          : [],
  width           : 0,
};

export default ReactSCarousel;
