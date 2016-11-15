# react-s-carousel

React simple carousel component

## props

prop name | type | default | description
----------|------|---------|-------------
arrows    | boolean | true | show arrow navigation
autoPlay  | boolean | true | enable auto playing
autoPlayInterval | number | 3000 | millisecond interval in autoplay
autoPlayIntervals | array | []   | array of "autoPlayInterval" for each slide. If this prop is specified, "autoPlayInterval" prop will be ignored.
cssEase   | string  | "ease-in-out" | value of CSS "transition-timing-function"
dots      | boolean | true | show dots navigation represents current slide
duration  | number  | 500  | value of CSS "transition-duration"
initialSlide | number | 0  | index number of initial slide
pauseOnAction | boolean | true | pause auto playing when clicking slides
slides        | array   | []   | array of components to each slide to render
width         | number or string | "auto" | pixel width of slider viewport
slideWidth    | number or string | "auto" | pixel width of each slide
mode          | string | "slide" | transition effect type: "slide" or "fade"
backgroundColor | string | "white" | value of CSS "background-color"
