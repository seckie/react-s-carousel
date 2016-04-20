"use strict";
var gulp = require("gulp");
var jade = require("gulp-jade");
var stylus = require("gulp-stylus");
var webpack = require("gulp-webpack");
var nib = require("nib");
var browserSync = require("browser-sync");
var notify = require("gulp-notify");
var data = require("gulp-data");
var rename = require("gulp-rename");

var PATHS = {
  data: "./data.json",

  jade: [ "src/jade/**/*.jade" ],
  jadeEntry: [ "src/jade/**/!(_)*.jade" ],
  htmlDir: "./",

  jsx: [ "src/jsx/**/*.jsx" ],
  jsxMain: "src/jsx/main.jsx",
  js: [ "./js/**/*.js" ],
  jsDir: "./js",
  jsMain: "./js/main.js",

  stylus: [ "src/stylus/**/*.styl" ],
  stylusEntry: [ "src/stylus/**/!(_)*.styl" ],
  css: [ "./css/**/*.css" ],
  cssDir: "./css",
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

gulp.task("jade", function () {
  return gulp.src(PATHS.jadeEntry)
    .pipe(jade({ pretty: true }))
    .on("error", errorHandler)
    .pipe(gulp.dest(PATHS.htmlDir));
});

gulp.task("stylus", function () {
  return gulp.src(PATHS.stylusEntry)
    .pipe(stylus({ use: [ nib() ] }))
    .on("error", errorHandler)
    .pipe(gulp.dest(PATHS.cssDir))
});

gulp.task("build", function () {
  return gulp.src(PATHS.jsxMain)
    .pipe(webpack({
      output: { filename: "[name].js" },
      module: {
        loaders: [
          { test: /\.jsx$/, exclude: /node_modules/, loader: "babel" }
        ],
        resolve: {
          extensions: [ "", ".js", ".jsx" ]
        }
      },
      externals: {
        "react": "React",
        "react/addons": "React",
        "immutable": "Immutable",
      }
    }))
    .on("error", errorHandler)
    .pipe(gulp.dest(PATHS.jsDir))
    .pipe(browserSync.stream());
});


gulp.task("default", function () {
  browserSync.init({
    open: false,
    server: {
      baseDir: "./",
      middleware: [
        function (req, res, next) {
          var msg = req.method + " " + req.url;
          console.log(msg);
          next();
        }
      ]
    }
  });
  gulp.watch(PATHS.jade, [ "jade" ]);
  gulp.watch(PATHS.stylus, [ "stylus" ]);
  gulp.watch(PATHS.jsx, [ "build" ]);
});
