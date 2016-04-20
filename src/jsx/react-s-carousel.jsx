"use strict";

import React, { Component } from "react";

class ReactSCarousel extends Component {
  constructor (props) {
    super(props);
  }
  render ()  {
    var slides = this.props.slides.map((slide) => {
      return (
        <div className="slide">
        <a href={slide.href}>
        <img src={slide.imgsrc} alt={slide.imgalt} />
        </a>
        </div>
      );
    });
    return (
      <div className="scarousel">
      {slides}
      </div>
    );
  }
}

ReactSCarousel.propTypes = {
  slides: React.PropTypes.array,
};
ReactSCarousel.defaultProps = {
  slides: []
};

export default ReactSCarousel;
