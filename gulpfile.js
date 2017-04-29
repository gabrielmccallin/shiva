var SHIVA = "shiva",
  SOURCE = "src",
  TYPES = "types",
  TARGET = "dist",
  PORT = "1338",

  gulp = require("gulp"),
  watch = require("gulp-watch"),
  sourcemaps = require("gulp-sourcemaps"),
  connect = require("gulp-connect"),
  replace = require("gulp-replace"),
  ts = require("gulp-typescript"),
  merge = require("merge2"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  rename = require('gulp-rename'),
  gutil = require('gulp-util'),

  version = "0.5.0";

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
    .src([TYPES + "/**/*.ts", SOURCE + "/**/*.ts"])
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
      .pipe(rename(SHIVA + "-global.d.ts"))
      .pipe(gulp.dest(TARGET))
      .pipe(replace('module shiva', 'module "shiva"'))
      .pipe(replace('shiva.Event', 'Event'))
      .pipe(rename(SHIVA + ".d.ts"))
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
  gulp.src(["typings/promise.d.ts", TARGET + "/" + SHIVA + ".d.ts"])
    .pipe(concat(SHIVA + ".d.ts"))
    .pipe(gulp.dest(TARGET));
});

gulp.task("add-defs-global", ["add-defs"], function () {
  gulp.src(["typings/promise.d.ts", TARGET + "/" + SHIVA + "-global.d.ts"])
    .pipe(concat(SHIVA + "-global.d.ts"))
    .pipe(gulp.dest(TARGET));
});


gulp.task("publish", ["transpile", "add-defs", "add-defs-global"], function () {
  return gulp.src(["libs/promise-polyfill.js", "libs/begin-iife.js", TARGET + "/" + SHIVA + ".js", "libs/umd.js"])
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

var jasmineBrowser = require('gulp-jasmine-browser');

// gulp.task('jasmine', function() {
//   return gulp.src(['dist/shiva.js', 'spec/Container.spec.ts'])
//     .pipe(jasmineBrowser.specRunner())
//     .pipe(jasmineBrowser.server({port: 8888}));
// });

gulp.task('jasmine', function() {
  var filesForTest = ['dist/shiva.js', 'spec/*.spec.js'];
  return gulp.src(filesForTest)
    .pipe(watch(filesForTest))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
});

var karmaServer = require("karma").Server;
gulp.task('karma', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});


gulp.task("default", ["webserver", "watch-dev"]);