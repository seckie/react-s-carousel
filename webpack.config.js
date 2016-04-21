"use strict";

module.exports = {
  output: { filename: "react-s-carousel.js" },
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: "babel" }
    ],
    resolve: {
      extensions: [ "", ".js", ".jsx" ]
    }
  },
  externals: {
    "react": {
      "var": "React",
      commonjs: "react",
      commonjs2: "react"
    },
    "react-dom": {
      "var": "ReactDOM",
      commonjs: "react-dom",
      commonjs2: "react-dom"
    },
    "lodash": {
      "var": "_",
      commonjs: "lodash",
      commonjs2: "lodash"
    },
    "classnames": {
      "var": "classNames",
      commonjs: "classnames",
      commonjs2: "classnames"
    }
  }
};
