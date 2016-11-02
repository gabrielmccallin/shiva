var SHIVA = "shiva";
var SOURCE = "src";
var TARGET = "dist";
var PORT = "1338";

var gulp = require("gulp"),
  watch = require("gulp-watch"),
  sourcemaps = require("gulp-sourcemaps"),
  connect = require("gulp-connect");
var ts = require("gulp-typescript");
var merge = require("merge2");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var version = "0.5.0";

gulp.task("webserver", function () {
  connect.server({
    // livereload: true,
    port: PORT
  });
});

gulp.task("reload", function () {
  gulp.src([DIST + "/**/*.js"])
    .pipe(watch([DIST + "/**/*.js"]))
    .pipe(connect.reload());
});


gulp.task("watch-dev", function () {
  gulp.watch(SOURCE + "/**/*.ts", ["dev"]);
});


gulp.task("transpile", function () {
  var tsResult = gulp
    .src([SOURCE + "/**/*.ts"])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(ts({
      "target": "ES5",
      "declaration": true,
      "noImplicitAny": false,
      "removeComments": true,
      "out": SHIVA + ".js",
    }));

  return merge([
    tsResult
      .dts
      .pipe(gulp.dest(TARGET)),
    tsResult
      .js
      // .pipe(uglify())
      // .pipe(sourcemaps.write())
      .pipe(sourcemaps.write("/", {
        sourceRoot: "../" + SOURCE + "/"
      }))
      .pipe(gulp.dest(TARGET))
  ]);

});

gulp.task("add-defs", ["transpile"], function () {
  gulp.src(["typings/promise.d.ts", "dist/shiva.d.ts", "libs/node_modules-definition.d.ts"])
    .pipe(concat(SHIVA + ".d.ts"))
    .pipe(gulp.dest(TARGET));
})

gulp.task("publish", ["transpile", "add-defs"], function () {
  return gulp.src(["libs/promise-7.0.4.js", "libs/begin-iife.js", TARGET + "/" + SHIVA + ".js", "libs/umd.js"])
    .pipe(concat(SHIVA + ".js"))
    .pipe(gulp.dest(TARGET))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(rename(SHIVA + '.min.js'))
    .pipe(gulp.dest(TARGET))
});


gulp.task("dev", ["transpile", "add-defs"], function () {
  return gulp.src(["libs/promise-polyfill.js", "libs/begin-iife.js", TARGET + "/" + SHIVA + ".js", "libs/umd.js"])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat(SHIVA + ".js"))
    .pipe(sourcemaps.write("/", {
      sourceRoot: "../" + SOURCE + "/"
    }))
    .pipe(gulp.dest(TARGET))
});

gulp.task("watch", ["webserver", "watch-dev"]);
gulp.task("default", ["publish"]);