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
    console.log('props:', props);
    this.state = {
      timer: 0,
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
    var index = this.state.index + 1;
    var min = 0;
    var max = this.props.slides.length - 1 + 2; // +2 is cloned slides
    if (this.props.mode === "fade" && index >= max) {
      index = min + 1;
    }
    this._updateIndex(index);
    this._setTimer();
  }
  _setTimer () {
    this.setState({
      timer: setTimeout(this._tick.bind(this), this.props.autoPlayInterval)
    });
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
  onClickSlide (e) {
    if (this.props.pauseOnAction) {
      this.setState({ playing: false });
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
      clearTimeout(this.state.timer);
      var isAfterClick = this.state.enableClick === false;
      var shouldBePause = isAfterClick && this.props.pauseOnAction;
      if (this.props.autoPlay && !shouldBePause) {
        this.setState({
          timer: setTimeout(this._tick.bind(this), this.props.autoPlayInterval)
        });
      }
    }
    this.setState(state);
  }
  render () {
    var width = this.state.width || this.props.width;
    var style = {
      width: width || "100%",
      position: "relative",
      overflow: "hidden"
    };
    var firstSlide = this.props.slides[0];
    var lastSlide = this.props.slides[this.props.slides.length - 1];
    var slides = [].concat(lastSlide, this.props.slides, firstSlide);
    var slidesProps = {
      slides          : slides,
      width           : width,
      index           : this.state.index,
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
    var slidesComponent = this.props.mode === "fade" ? (
      <SlidesFadeMode {...slidesProps} />
    ) : (
      <Slides {...slidesProps} />
    );
    var dummySlide = this.props.mode === "fade" ? (
      <div style={{ visibility: "hidden", zIndex: -1 }}>{slides[0]}</div>
    ) : "";
    return (
      <div className="scarousel" style={style}>
        {slidesComponent}
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
  cssEase         : React.PropTypes.string,
  dots            : React.PropTypes.bool,
  duration        : React.PropTypes.number,
  initialSlide    : React.PropTypes.number,
  pauseOnAction   : React.PropTypes.bool,
  slides          : React.PropTypes.array,
  width          : React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  mode            : React.PropTypes.string,
  backgroundColor: React.PropTypes.string
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
  width           : "auto",
  mode            : "slide",
  backgroundColor : "white"
};

export default ReactSCarousel;
