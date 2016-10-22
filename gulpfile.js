var gulp = require("gulp"),
  watch = require("gulp-watch"),
  sourcemaps = require("gulp-sourcemaps"),
  connect = require("gulp-connect");
var ts = require("gulp-typescript");
var merge = require("merge2");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var version = "0.3.0";

gulp.task("webserver", function () {
  connect.server({
    // livereload: true,
    port: 34567
  });
});

gulp.task("reload", function () {
  gulp.src(["dist/**/*.js"])
    .pipe(watch(["dist/**/*.js"]))
    .pipe(connect.reload());
});


gulp.task("watch", function () {
  gulp.watch("src/**/*.ts", ["transpile", "publish"]);
});


gulp.task("transpile", function () {
  var tsResult = gulp
    .src(["src/**/*.ts"])
    .pipe(sourcemaps.init())
    .pipe(ts({
      "target": "ES5",
      "declaration": true,
      "noImplicitAny": false,
      "removeComments": true,
      "out": "curly.js",
    }));

  return merge([
    tsResult.dts.pipe(gulp.dest("typings")),
    tsResult
      .js
      .pipe(uglify())
      .pipe(sourcemaps.write("/", {
        sourceRoot: "../src/"
      }))
      .pipe(gulp.dest("serve"))
  ]);

});



gulp.task("publish", ["transpile"], function () {
  return gulp.src(["begin-iife.js", "serve/curly.js", "umd.js"])
    .pipe(concat("curly.js"))
    .pipe(gulp.dest("serve"));
});

gulp.task("default", ["webserver", "watch"]);