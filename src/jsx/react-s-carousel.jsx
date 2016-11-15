"use strict";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import classnames from "classnames";
import Slides from "./slides.jsx";
import SlidesFadeMode from "./slides-fademode.jsx";

var prefix = "scarousel";

class ReactSCarousel extends Component {
  constructor (props) {
    super(props);
    var clonedCount = this.props.slides.length; // this.props.slides.length looking cloned slides
    this.state = {
      timer: 0,
      index: props.initialSlide + clonedCount,
      count: 0,
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
      this._setTimer();
    }
  }
  componentWillUpdate (nextProps) {
    if (this.props.autoPlay !== nextProps.autoPlay) {
      this.setState({
        playing: nextProps.autoPlay
      });
      if (nextProps.autoPlay) {
        clearTimeout(this.state.timer);
        this._setTimer();
      }
    }
  }
  _tick () {
    if (!this.state.playing) {
      clearTimeout(this.state.timer);
      return;
    }
    this._updateIndex(this.state.index + 1);
    this._setTimer();
  }
  _setTimer () {
    this.setState({
      playing: true,
      enableClick: true
    });
    var index = this.state.index % 3;
    var interval = this.props.autoPlayIntervals[index] || this.props.autoPlayInterval;
    clearTimeout(this.state.timer);
    this.setState({
      timer: setTimeout(this._tick.bind(this), interval)
    });
  }
  _updateIndex (index, count) {
    var min = 0;
    var clonedCount = this.props.slides.length * 2; // cloned slides
    var max = this.props.slides.length - 1 + clonedCount;
    if (index < min) {
      index = max;
    } else if (max < index) {
      index = min;
    }
    count = typeof count === "number" ? count : this.state.count + 1;
    this.setState({
      index: index,
      count: count
    });
  }
  _updateStateOnClick () {
    this.setState({
      playing: false,
      enableClick: false
    });
    this._setTimer();
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
      var count = this.state.count - 1
      this._updateIndex(index, count);
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
  onClickSlide (e) {
    if (this.props.pauseOnAction) {
      this.setState({ playing: false });
    }
  }
  onMouseEnterSlide (e) {
    this.setState({
      playing: false,
      enableClick: false
    });
  }
  onMouseLeaveSlide (e) {
    this.setState({
      playing: true,
      enableClick: true
    });
    this._setTimer();
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
      clearTimeout(this.state.timer);
      var isAfterClick = this.state.enableClick === false;
      var shouldBePause = isAfterClick && this.props.pauseOnAction;
      if (this.props.autoPlay && !shouldBePause) {
        this._setTimer();
      }
    }
    this.setState(state);
  }
  render () {
    var width = this.state.width && this.props.width === "auto" ? this.state.width : this.props.width;
    var slides = [].concat(this.props.slides, this.props.slides, this.props.slides);
    var slidesProps = {
      slides          : slides,
      width           : width,
      slideWidth      : this.props.slideWidth || width,
      index           : this.state.index,
      count           : this.state.count,
      duration        : this.props.duration,
      cssEase         : this.props.cssEase,
      loop            : this.loop.bind(this),
      onClickSlide    : this.onClickSlide.bind(this),
      onTransitionEnd : this.onTransitionEnd.bind(this),
      enableTransition: this.state.enableTransition,
      mode            : this.props.mode
    };

    if (this.props.dots) {
      var dots = slides.map((slide, i) => {
        if (i < this.props.slides.length || this.props.slides.length * 2 <= i) {
          return "";
        }
        var count = this.props.slides.length;
        var i2 = i % count;
        var stateIndex = this.state.index % count;
        var cName = classnames(`${prefix}-dot`, {
          active: stateIndex === i2
        });
        return (
          <button className={cName} key={`dot${i}`}
            data-index={i2}
            onClick={this.onClickDot.bind(this)}>{i2}</button>
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
    var slidesComponent = this.props.mode === "fade" ? (
      <SlidesFadeMode {...slidesProps} />
    ) : (
      <Slides {...slidesProps} />
    );
    var dummySlide = this.props.mode === "fade" ? (
      <div style={{ visibility: "hidden", zIndex: -1 }}>{slides[0]}</div>
    ) : "";
    var style = {
      width: width,
      position: "relative"
    };
    style.overflow = this.props.mode === "fade" ? "visible" : "hidden";
    return (
      <div className="scarousel">
        <div className="scarousel-viewport" style={style}
          onMouseEnter={this.onMouseEnterSlide.bind(this)}
          onMouseLeave={this.onMouseLeaveSlide.bind(this)}>
          {slidesComponent}
        </div>
        {dummySlide}
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
  autoPlayIntervals: React.PropTypes.arrayOf(React.PropTypes.number),
  cssEase         : React.PropTypes.string,
  dots            : React.PropTypes.bool,
  duration        : React.PropTypes.number,
  initialSlide    : React.PropTypes.number,
  pauseOnAction   : React.PropTypes.bool,
  slides          : React.PropTypes.array,
  width           : React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  slideWidth      : React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  mode            : React.PropTypes.string,
  backgroundColor : React.PropTypes.string
};
ReactSCarousel.defaultProps = {
  arrows          : true,
  autoPlay        : true,
  autoPlayInterval: 3000,
  autoPlayIntervals: [],
  cssEase         : "ease-in-out",
  dots            : true,
  duration        : 500,
  initialSlide    : 0,
  pauseOnAction   : true,
  slides          : [],
  width           : "auto",
  mode            : "slide",
  backgroundColor : "white"
};

export default ReactSCarousel;
