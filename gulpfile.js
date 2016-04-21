"use strict";
var gulp = require("gulp");
var stylus = require("gulp-stylus");
var webpack = require("gulp-webpack");
var webpackConfig = require("./webpack.config.js");
var nib = require("nib");
var browserSync = require("browser-sync");
var notify = require("gulp-notify");
var rename = require("gulp-rename");
var _ = require("lodash");

var PUBLIC_PATH = "./public/";
var DIST_FILENAME = "react-s-carousel.js";
var PATHS = {
  htmlDir: PUBLIC_PATH,

  jsx: [ "src/jsx/**/*.jsx" ],
  jsxMain: "src/jsx/main.jsx",
  js: [ PUBLIC_PATH + "js/**/*.js" ],
  jsDir: PUBLIC_PATH + "js",
  jsMain: PUBLIC_PATH + "js/main.js",

  distDir: "./dist",

  stylus: [ "src/stylus/**/*.styl" ],
  stylusEntry: [ "src/stylus/**/!(_)*.styl" ],
  css: [ PUBLIC_PATH + "css/**/*.css" ],
  cssDir: PUBLIC_PATH + "css"
};

var errorHandler = function (e) {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>",
    sound: false
  }).apply(this, args);
  this.emit("end");
};

gulp.task("stylus", function () {
  return gulp.src(PATHS.stylusEntry)
    .pipe(stylus({ use: [ nib() ] }))
    .on("error", errorHandler)
    .pipe(gulp.dest(PATHS.cssDir))
    .pipe(browserSync.stream());
});

gulp.task("build", function () {
  var config = _.assign({}, webpackConfig);
  config.output.filename = "main.js";
  config.externals = {};
  return gulp.src(PATHS.jsxMain)
    .pipe(webpack(config))
    .on("error", errorHandler)
    .pipe(gulp.dest(PATHS.jsDir))
    .pipe(browserSync.stream());
});

gulp.task("dist", function () {
  return gulp.src(PATHS.jsxMain)
    .pipe(webpack(webpackConfig))
    .on("error", errorHandler)
    .pipe(gulp.dest(PATHS.distDir))
    .pipe(browserSync.stream());
});


gulp.task("default", function () {
  browserSync.init({
    open: false,
    server: {
      baseDir: "./public",
      middleware: [
        function (req, res, next) {
          var msg = req.method + " " + req.url;
          console.log(msg);
          next();
        }
      ]
    }
  });
  gulp.watch(PATHS.stylus, [ "stylus" ]);
  gulp.watch(PATHS.jsx, [ "build" ]);
});
