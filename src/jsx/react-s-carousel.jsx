"use strict";

import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import classnames from "classnames";
import Slides from "./slides.jsx";
import SlidesFadeMode from "./slides-fademode.jsx";

var PREFIX = "scarousel";

class ReactSCarousel extends Component {
  constructor (props) {
    super(props);
    var clonedCount = this.props.slides.length; // this.props.slides.length looking cloned slides
    this.state = {
      timer: 0,
      index: props.initialSlide + clonedCount,
      count: 0,
      enableTransition: true
    };

    // These props area NOT associated to render().
    // So they shouldn't be menber of "state".
    this.playing = props.autoPlay;
    this.enableClick = true;
  }
  componentDidMount () {
    var el = ReactDOM.findDOMNode(this);
    this.setState({
      width: el.clientWidth
    });
    if (this.playing) {
      this._setTimer();
    }
  }
  componentWillUpdate (nextProps) {
    if (this.props.autoPlay !== nextProps.autoPlay) {
      this.playing = nextProps.autoPlay;
      if (nextProps.autoPlay) {
        clearTimeout(this.state.timer);
        this._setTimer();
      }
    }
  }
  _tick () {
    if (this.playing === false) {
      clearTimeout(this.state.timer);
      return;
    }
    this._updateIndex(this.state.index + 1);
    this._setTimer();
  }
  _setTimer () {
    this.playing = true;
    this.enableClick = true;

    var index = this.state.index % this.props.slides.length;
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
    this.playing = false;
    this.enableClick = false;
    this._setTimer();
  }
  onClickNext () {
    if (this.state.enableClick) {
      var index = this.state.index + 1;
      this._updateIndex(index);
      this._updateStateOnClick();
    } else {
      console.info('click disabled');
    }
  }
  onClickPrev () {
    if (this.state.enableClick) {
      var index = this.state.index - 1;
      var count = this.state.count - 1
      this._updateIndex(index, count);
      this._updateStateOnClick();
    } else {
      console.info('click disabled');
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
      this.playing = false;
    }
  }
  onMouseEnterSlide (e) {
    if (this.props.autoPlay) {
      this.playing = false;
      this.enableClick = false;
    }
  }
  onMouseLeaveSlide (e) {
    if (this.props.autoPlay) {
      this.playing = true;
      this.enableClick = true;
      this._setTimer();
    }
  }
  loop () {
    this.setState({
      enableTransition: true
    });
  }
  onTransitionEnd () {
    this.enableClick = true;
    this.playing = true;

    var state = {};
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
    if (this.playing === false) {
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
    if (this.props.width === "auto" && !this.state.width) {
      return <div className="scarousel" />;
    }
    var width = this.props.width === "auto" ? this.state.width : this.props.width;
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
      mode            : this.props.mode,
      onChange        : this.props.onChange,
      onInit          : this.props.onInit
    };

    if (this.props.dots) {
      var dots = slides.map((slide, i) => {
        if (i < this.props.slides.length || this.props.slides.length * 2 <= i) {
          return "";
        }
        var count = this.props.slides.length;
        var i2 = i % count;
        var stateIndex = this.state.index % count;
        var cName = classnames(`${PREFIX}-dot`, {
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
        <button className={`${PREFIX}-arrow prev`}
          onClick={this.onClickPrev.bind(this)}>
          Prev</button>
      );
      var nextArrow = (
        <button className={`${PREFIX}-arrow next`}
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
        <div className={`${PREFIX}-dots`}>
          {dots}
        </div>
      </div>
    );
  }
}

ReactSCarousel.propTypes = {
  arrows           : PropTypes.bool,
  autoPlay         : PropTypes.bool,
  autoPlayInterval : PropTypes.number,
  autoPlayIntervals: PropTypes.arrayOf(PropTypes.number),
  cssEase          : PropTypes.string,
  dots             : PropTypes.bool,
  duration         : PropTypes.number,
  initialSlide     : PropTypes.number,
  pauseOnAction    : PropTypes.bool,
  slides           : PropTypes.array,
  width            : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  slideWidth       : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  mode             : PropTypes.string,
  backgroundColor  : PropTypes.string,
  onChange         : PropTypes.func,
  onInit           : PropTypes.func
};
ReactSCarousel.defaultProps = {
  arrows           : true,
  autoPlay         : true,
  autoPlayInterval : 3000,
  autoPlayIntervals: [],
  cssEase          : "ease-in-out",
  dots             : true,
  duration         : 500,
  initialSlide     : 0,
  pauseOnAction    : true,
  slides           : [],
  width            : "auto",
  mode             : "slide",
  backgroundColor  : "white",
  onChange         : function () {},
  onInit           : function () {}
};

export default ReactSCarousel;
