"use strict";

module.exports = {
  output: {
    filename: "react-s-carousel.js",
    libraryTarget: "umd"
  },
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
      root: "React",
      commonjs: "react",
      commonjs2: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom"
    },
    "lodash": {
      root: "_",
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash"
    },
    "classnames": {
      root: "classNames",
      commonjs: "classnames",
      commonjs2: "classnames",
      amd: "classnames"
    }
  }
};
