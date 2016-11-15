(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("lodash"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "lodash", "classnames"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("react-dom"), require("lodash"), require("classnames")) : factory(root["React"], root["ReactDOM"], root["_"], root["classNames"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _lodash = __webpack_require__(3);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _slides = __webpack_require__(5);

	var _slides2 = _interopRequireDefault(_slides);

	var _slidesFademode = __webpack_require__(6);

	var _slidesFademode2 = _interopRequireDefault(_slidesFademode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PREFIX = "scarousel";

	var ReactSCarousel = function (_Component) {
	  _inherits(ReactSCarousel, _Component);

	  function ReactSCarousel(props) {
	    _classCallCheck(this, ReactSCarousel);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactSCarousel).call(this, props));

	    var clonedCount = _this.props.slides.length; // this.props.slides.length looking cloned slides
	    _this.state = {
	      timer: 0,
	      index: props.initialSlide + clonedCount,
	      count: 0,
	      playing: props.autoPlay,
	      enableTransition: true
	    };
	    return _this;
	  }

	  _createClass(ReactSCarousel, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var el = _reactDom2.default.findDOMNode(this);
	      this.setState({
	        width: el.clientWidth
	      });
	      if (this.state.playing) {
	        this._setTimer();
	      }
	    }
	  }, {
	    key: "componentWillUpdate",
	    value: function componentWillUpdate(nextProps) {
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
	  }, {
	    key: "_tick",
	    value: function _tick() {
	      if (!this.state.playing) {
	        clearTimeout(this.state.timer);
	        return;
	      }
	      this._updateIndex(this.state.index + 1);
	      this._setTimer();
	    }
	  }, {
	    key: "_setTimer",
	    value: function _setTimer() {
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
	  }, {
	    key: "_updateIndex",
	    value: function _updateIndex(index, count) {
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
	  }, {
	    key: "_updateStateOnClick",
	    value: function _updateStateOnClick() {
	      this.setState({
	        playing: false,
	        enableClick: false
	      });
	      this._setTimer();
	    }
	  }, {
	    key: "onClickNext",
	    value: function onClickNext() {
	      if (this.state.enableClick) {
	        var index = this.state.index + 1;
	        this._updateIndex(index);
	        this._updateStateOnClick();
	      }
	    }
	  }, {
	    key: "onClickPrev",
	    value: function onClickPrev() {
	      if (this.state.enableClick) {
	        var index = this.state.index - 1;
	        var count = this.state.count - 1;
	        this._updateIndex(index, count);
	        this._updateStateOnClick();
	      }
	    }
	  }, {
	    key: "onClickDot",
	    value: function onClickDot(e) {
	      if (this.state.enableClick) {
	        var index = +e.currentTarget.dataset.index;
	        if (index !== this.state.index) {
	          this._updateIndex(index);
	          this._updateStateOnClick();
	        }
	      }
	    }
	  }, {
	    key: "onClickSlide",
	    value: function onClickSlide(e) {
	      if (this.props.pauseOnAction) {
	        this.setState({ playing: false });
	      }
	    }
	  }, {
	    key: "onMouseEnterSlide",
	    value: function onMouseEnterSlide(e) {
	      if (this.props.autoPlay) {
	        this.setState({
	          playing: false,
	          enableClick: false
	        });
	      }
	    }
	  }, {
	    key: "onMouseLeaveSlide",
	    value: function onMouseLeaveSlide(e) {
	      if (this.props.autoPlay) {
	        this.setState({
	          playing: true,
	          enableClick: true
	        });
	        this._setTimer();
	      }
	    }
	  }, {
	    key: "loop",
	    value: function loop() {
	      this.setState({
	        enableTransition: true
	      });
	    }
	  }, {
	    key: "onTransitionEnd",
	    value: function onTransitionEnd() {
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
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;

	      if (this.props.width === "auto" && !this.state.width) {
	        return _react2.default.createElement("div", { className: "scarousel" });
	      }
	      var width = this.props.width === "auto" ? this.state.width : this.props.width;
	      var slides = [].concat(this.props.slides, this.props.slides, this.props.slides);
	      var slidesProps = {
	        slides: slides,
	        width: width,
	        slideWidth: this.props.slideWidth || width,
	        index: this.state.index,
	        count: this.state.count,
	        duration: this.props.duration,
	        cssEase: this.props.cssEase,
	        loop: this.loop.bind(this),
	        onClickSlide: this.onClickSlide.bind(this),
	        onTransitionEnd: this.onTransitionEnd.bind(this),
	        enableTransition: this.state.enableTransition,
	        mode: this.props.mode,
	        onChange: this.props.onChange
	      };

	      if (this.props.dots) {
	        var dots = slides.map(function (slide, i) {
	          if (i < _this2.props.slides.length || _this2.props.slides.length * 2 <= i) {
	            return "";
	          }
	          var count = _this2.props.slides.length;
	          var i2 = i % count;
	          var stateIndex = _this2.state.index % count;
	          var cName = (0, _classnames2.default)(PREFIX + "-dot", {
	            active: stateIndex === i2
	          });
	          return _react2.default.createElement(
	            "button",
	            { className: cName, key: "dot" + i,
	              "data-index": i2,
	              onClick: _this2.onClickDot.bind(_this2) },
	            i2
	          );
	        });
	      }
	      if (this.props.arrows) {
	        var prevArrow = _react2.default.createElement(
	          "button",
	          { className: PREFIX + "-arrow prev",
	            onClick: this.onClickPrev.bind(this) },
	          "Prev"
	        );
	        var nextArrow = _react2.default.createElement(
	          "button",
	          { className: PREFIX + "-arrow next",
	            onClick: this.onClickNext.bind(this) },
	          "Next"
	        );
	      }
	      var slidesComponent = this.props.mode === "fade" ? _react2.default.createElement(_slidesFademode2.default, slidesProps) : _react2.default.createElement(_slides2.default, slidesProps);
	      var dummySlide = this.props.mode === "fade" ? _react2.default.createElement(
	        "div",
	        { style: { visibility: "hidden", zIndex: -1 } },
	        slides[0]
	      ) : "";
	      var style = {
	        width: width,
	        position: "relative"
	      };
	      style.overflow = this.props.mode === "fade" ? "visible" : "hidden";
	      return _react2.default.createElement(
	        "div",
	        { className: "scarousel" },
	        _react2.default.createElement(
	          "div",
	          { className: "scarousel-viewport", style: style,
	            onMouseEnter: this.onMouseEnterSlide.bind(this),
	            onMouseLeave: this.onMouseLeaveSlide.bind(this) },
	          slidesComponent
	        ),
	        dummySlide,
	        prevArrow,
	        nextArrow,
	        _react2.default.createElement(
	          "div",
	          { className: PREFIX + "-dots" },
	          dots
	        )
	      );
	    }
	  }]);

	  return ReactSCarousel;
	}(_react.Component);

	ReactSCarousel.propTypes = {
	  arrows: _react.PropTypes.bool,
	  autoPlay: _react.PropTypes.bool,
	  autoPlayInterval: _react.PropTypes.number,
	  autoPlayIntervals: _react.PropTypes.arrayOf(_react.PropTypes.number),
	  cssEase: _react.PropTypes.string,
	  dots: _react.PropTypes.bool,
	  duration: _react.PropTypes.number,
	  initialSlide: _react.PropTypes.number,
	  pauseOnAction: _react.PropTypes.bool,
	  slides: _react.PropTypes.array,
	  width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	  slideWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	  mode: _react.PropTypes.string,
	  backgroundColor: _react.PropTypes.string,
	  onChange: _react.PropTypes.func
	};
	ReactSCarousel.defaultProps = {
	  arrows: true,
	  autoPlay: true,
	  autoPlayInterval: 3000,
	  autoPlayIntervals: [],
	  cssEase: "ease-in-out",
	  dots: true,
	  duration: 500,
	  initialSlide: 0,
	  pauseOnAction: true,
	  slides: [],
	  width: "auto",
	  mode: "slide",
	  backgroundColor: "white",
	  onChange: function onChange() {}
	};

	exports.default = ReactSCarousel;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(3);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Slides = function (_Component) {
	  _inherits(Slides, _Component);

	  function Slides(props) {
	    _classCallCheck(this, Slides);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Slides).call(this, props));
	  }

	  _createClass(Slides, [{
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      if (!this.props.enableTransition) {
	        _lodash2.default.defer(this.props.loop);
	      }
	    }
	  }, {
	    key: "onTransitionEnd",
	    value: function onTransitionEnd() {
	      this.props.onChange(this.props);
	      this.props.onTransitionEnd();
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;

	      var slides = this.props.slides.map(function (slide, i) {
	        var cName = (0, _classnames2.default)("slide", {
	          active: _this2.props.index === i
	        });
	        var style = {
	          width: _this2.props.slideWidth,
	          cssFloat: "left"
	        };
	        return _react2.default.createElement(
	          "div",
	          { key: "slide" + i, className: cName,
	            style: style, onClick: _this2.props.onClickSlide },
	          slide
	        );
	      });
	      var transition = this.props.enableTransition ? "transform " + this.props.duration + "ms " + this.props.cssEase : "none";
	      var slidesStyle = {
	        width: this.props.slideWidth * this.props.slides.length,
	        transform: "translateX(" + -this.props.slideWidth * this.props.index + "px)",
	        transition: transition
	      };
	      return _react2.default.createElement(
	        "div",
	        { className: "scarousel-slides", style: slidesStyle,
	          onTransitionEnd: this.onTransitionEnd.bind(this) },
	        slides
	      );
	    }
	  }]);

	  return Slides;
	}(_react.Component);

	Slides.propTypes = {
	  slides: _react.PropTypes.array,
	  width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	  slideWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	  index: _react.PropTypes.number,
	  duration: _react.PropTypes.number,
	  cssEase: _react.PropTypes.string,
	  loop: _react.PropTypes.func,
	  onClickSlide: _react.PropTypes.func,
	  onTransitionEnd: _react.PropTypes.func,
	  onChange: _react.PropTypes.func
	};
	Slides.defaultProps = {
	  slides: [],
	  width: "auto",
	  slideWidth: "auto",
	  index: 0,
	  duration: 500,
	  cssEase: "ease-in-out",
	  loop: function loop() {},
	  onClickSlide: function onClickSlide() {},
	  onTransitionEnd: function onTransitionEnd() {},
	  onChange: function onChange() {}
	};

	exports.default = Slides;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Slides = function (_Component) {
	  _inherits(Slides, _Component);

	  function Slides(props) {
	    _classCallCheck(this, Slides);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Slides).call(this, props));
	  }

	  _createClass(Slides, [{
	    key: "onTransitionEnd",
	    value: function onTransitionEnd() {
	      this.props.onChange(this.props);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;

	      var count = this.props.slides.length;
	      var transition = "opacity " + this.props.duration + "ms " + this.props.cssEase;
	      var index = this.props.index;
	      var prevIndex = index - 1 >= 0 ? index - 1 : this.props.slides.length - 1;
	      var slides = this.props.slides.map(function (slide, i) {
	        var isPrev = prevIndex === i;
	        var isActive = index === i;
	        var isNext = index === i - 1 || 0 === i && index >= count - 1;
	        var cName = (0, _classnames2.default)("slide", {
	          prev: isPrev,
	          active: isActive,
	          next: isNext
	        });
	        var style = {
	          width: _this2.props.width,
	          height: _this2.props.height,
	          position: "absolute",
	          top: 0,
	          left: 0,
	          opacity: isPrev || isNext ? 0 : 1,
	          transition: transition
	        };
	        switch (true) {
	          case isPrev:
	            style.zIndex = _this2.props.count + 1;
	            break;
	          case isActive:
	            style.zIndex = _this2.props.count;
	            break;
	          case isNext:
	            style.zIndex = _this2.props.count - 1;
	            break;
	          default:
	            style.zIndex = -9999;
	        }
	        return _react2.default.createElement(
	          "div",
	          { key: "slide" + i, className: cName,
	            style: style, onClick: _this2.props.onClickSlide },
	          slide
	        );
	      });
	      var slidesStyle = {
	        position: "absolute",
	        top: 0,
	        left: 0,
	        width: this.props.width * this.props.slides.length,
	        backgroundColor: this.props.backgroundColor
	      };
	      return _react2.default.createElement(
	        "div",
	        { className: "scarousel-slides", style: slidesStyle,
	          onTransitionEnd: this.onTransitionEnd.bind(this) },
	        slides
	      );
	    }
	  }]);

	  return Slides;
	}(_react.Component);

	Slides.propTypes = {
	  slides: _react.PropTypes.array,
	  width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	  height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	  index: _react.PropTypes.number,
	  count: _react.PropTypes.number,
	  duration: _react.PropTypes.number,
	  cssEase: _react.PropTypes.string,
	  onClickSlide: _react.PropTypes.func,
	  mode: _react.PropTypes.string,
	  backgroundColor: _react.PropTypes.string,
	  onChange: _react.PropTypes.func
	};
	Slides.defaultProps = {
	  slides: [],
	  width: "auto",
	  height: "auto",
	  index: 0,
	  count: 0,
	  duration: 500,
	  cssEase: "ease-in-out",
	  onClickSlide: function onClickSlide() {},
	  mode: "slide",
	  backgroundColor: "white",
	  onChange: function onChange() {}
	};

	exports.default = Slides;

/***/ }
/******/ ])
});
;