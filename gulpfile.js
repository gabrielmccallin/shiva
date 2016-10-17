var gulp = require("gulp"),
  watch = require("gulp-watch"),
  sourcemaps = require("gulp-sourcemaps"),
  connect = require("gulp-connect");
var ts = require("gulp-typescript");
var merge = require("merge2");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var version = "0.3.0"; 

gulp.task("webserver", function() {
  connect.server({
    // livereload: true,
    port: 34567
  });
});
 
gulp.task("reload", function() {
  gulp.src(["dist/**/*.js"])
    .pipe(watch(["dist/**/*.js"]))
    .pipe(connect.reload());
});


gulp.task("watch", function() {
    gulp.watch("src/**/*.ts", ["transpile-dev"]);
}); 
 

gulp.task("transpile-dev", function () {
  var tsResult = gulp
        .src(["src/**/*.ts"]) 
        .pipe(sourcemaps.init())
        .pipe(ts({
          "target": "ES5",
          "declaration": true,
          "noImplicitAny": false,
          "removeComments": false,
          "noLib": false,
          "out": "curly."+ version + ".js",
          "noExternalResolve":true  
        }));
        
  return merge([
    tsResult.dts.pipe(gulp.dest("typings")),
    tsResult
      .js
      // .pipe(uglify())
      .pipe(sourcemaps.write("/", {
          sourceRoot:"../src/"
      }))
      .pipe(gulp.dest("serve"))
    ]);
      
});


gulp.task("transpile", function () {
  var tsResult = gulp
        .src(["src/**/*.ts"]) 
        // .pipe(sourcemaps.init())
        .pipe(ts({
          "target": "ES5",
          "declaration": true,
          "noImplicitAny": false,
          "removeComments": false,
          "noLib": false,
          "out": "curly."+ version + ".js",
          "noExternalResolve":true  
        }));
        
  return merge([
    tsResult.dts.pipe(gulp.dest("typings")),
    tsResult
      .js
      .pipe(uglify())
      // .pipe(sourcemaps.write("/", {
      //     sourceRoot:"../../src/"
      // }))
      .pipe(gulp.dest("serve"))
    ]);
      
});

gulp.task("npm-publish", ["transpile"], function(){
  gulp.src(["serve/curly."+ version + ".js", "node-module-converter.js"])
    .pipe(concat("curly.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("default", ["webserver", "watch"]);