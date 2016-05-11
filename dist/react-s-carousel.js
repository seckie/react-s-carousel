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

	var _Slides = __webpack_require__(5);

	var _Slides2 = _interopRequireDefault(_Slides);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var prefix = "scarousel";

	var ReactSCarousel = function (_Component) {
	  _inherits(ReactSCarousel, _Component);

	  function ReactSCarousel(props) {
	    _classCallCheck(this, ReactSCarousel);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactSCarousel).call(this, props));

	    _this.state = {
	      timer: 0,
	      index: props.initialSlide + 1, // +1 looking cloned slide
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
	        this.setState({
	          timer: setTimeout(this._tick.bind(this), this.props.autoPlayInterval)
	        });
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
	          this.setState({
	            timer: setTimeout(this._tick.bind(this), this.props.autoPlayInterval)
	          });
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
	      var index = this.state.index + 1;
	      this._updateIndex(index);
	      this.setState({
	        timer: setTimeout(this._tick.bind(this), this.props.autoPlayInterval)
	      });
	    }
	  }, {
	    key: "_updateIndex",
	    value: function _updateIndex(index) {
	      var min = 0;
	      var max = this.props.slides.length - 1 + 2; // +2 is cloned slides
	      if (index < min) {
	        index = max;
	      } else if (max < index) {
	        index = min;
	      }
	      this.setState({ index: index });
	    }
	  }, {
	    key: "_updateStateOnClick",
	    value: function _updateStateOnClick() {
	      this.setState({
	        playing: false,
	        enableClick: false
	      });
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
	        this._updateIndex(index);
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
	          this.setState({
	            timer: setTimeout(this._tick.bind(this), this.props.autoPlayInterval)
	          });
	        }
	      }
	      this.setState(state);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;

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
	        onClickSlide: this.onClickSlide.bind(this),
	        onTransitionEnd: this.onTransitionEnd.bind(this),
	        enableTransition: this.state.enableTransition
	      };

	      if (this.props.dots) {
	        var dots = slides.map(function (slide, i) {
	          if (i === 0 || slides.length - 1 <= i) {
	            return "";
	          }
	          var cName = (0, _classnames2.default)(prefix + "-dot", {
	            active: _this2.state.index === i
	          });
	          return _react2.default.createElement(
	            "button",
	            { className: cName, key: "dot" + i,
	              "data-index": i,
	              onClick: _this2.onClickDot.bind(_this2) },
	            i
	          );
	        });
	      }
	      if (this.props.arrows) {
	        var prevArrow = _react2.default.createElement(
	          "button",
	          { className: prefix + "-arrow prev",
	            onClick: this.onClickPrev.bind(this) },
	          "Prev"
	        );
	        var nextArrow = _react2.default.createElement(
	          "button",
	          { className: prefix + "-arrow next",
	            onClick: this.onClickNext.bind(this) },
	          "Next"
	        );
	      }
	      return _react2.default.createElement(
	        "div",
	        { className: "scarousel", style: style },
	        _react2.default.createElement(_Slides2.default, slidesProps),
	        prevArrow,
	        nextArrow,
	        _react2.default.createElement(
	          "div",
	          { className: prefix + "-dots" },
	          dots
	        )
	      );
	    }
	  }]);

	  return ReactSCarousel;
	}(_react.Component);

	ReactSCarousel.propTypes = {
	  arrows: _react2.default.PropTypes.bool,
	  autoPlay: _react2.default.PropTypes.bool,
	  autoPlayInterval: _react2.default.PropTypes.number,
	  cssEase: _react2.default.PropTypes.string,
	  dots: _react2.default.PropTypes.bool,
	  duration: _react2.default.PropTypes.number,
	  initialSlide: _react2.default.PropTypes.number,
	  pauseOnAction: _react2.default.PropTypes.bool,
	  slides: _react2.default.PropTypes.array,
	  width: _react2.default.PropTypes.number
	};
	ReactSCarousel.defaultProps = {
	  arrows: true,
	  autoPlay: true,
	  autoPlayInterval: 3000,
	  cssEase: "ease-in-out",
	  dots: true,
	  duration: 500,
	  initialSlide: 0,
	  pauseOnAction: true,
	  slides: [],
	  width: 0
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
	    key: "render",
	    value: function render() {
	      var _this2 = this;

	      var slides = this.props.slides.map(function (slide, i) {
	        var cName = (0, _classnames2.default)("slide", {
	          active: _this2.props.index === i
	        });
	        var style = {
	          width: _this2.props.width,
	          float: "left"
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
	        width: this.props.width * this.props.slides.length,
	        transform: "translateX(" + -this.props.width * this.props.index + "px)",
	        transition: transition
	      };
	      return _react2.default.createElement(
	        "div",
	        { className: "scarousel-slides", style: slidesStyle,
	          onTransitionEnd: this.props.onTransitionEnd },
	        slides
	      );
	    }
	  }]);

	  return Slides;
	}(_react.Component);

	Slides.propTypes = {
	  slides: _react2.default.PropTypes.array,
	  width: _react2.default.PropTypes.number,
	  index: _react2.default.PropTypes.number,
	  duration: _react2.default.PropTypes.number,
	  cssEase: _react2.default.PropTypes.string,
	  loop: _react2.default.PropTypes.func,
	  onClickSlide: _react2.default.PropTypes.func,
	  onTransitionEnd: _react2.default.PropTypes.func
	};
	Slides.defaultProps = {
	  slides: [],
	  width: 0,
	  index: 0,
	  duration: 500,
	  cssEase: "ease-in-out",
	  loop: function loop() {},
	  onClickSlide: function onClickSlide() {},
	  onTransitionEnd: function onTransitionEnd() {}
	};

	exports.default = Slides;

/***/ }
/******/ ])
});
;