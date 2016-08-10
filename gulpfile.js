var gulp = require("gulp"),
  watch = require("gulp-watch"),
  sourcemaps = require("gulp-sourcemaps"),
  connect = require("gulp-connect");
var ts = require("gulp-typescript");
var merge = require("merge2");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
 
gulp.task("webserver", function() {
  connect.server({
    livereload: true,
    port: 1337
  });
});
 
gulp.task("reload", function() {
  gulp.src(["deploy/**/*.js"])
    .pipe(watch(["deploy/**/*.js"]))
    .pipe(connect.reload());
});



gulp.task("watch-curly", function() {
    gulp.watch("src/**/*.ts", ["transpile-curly", "rollup-curly"]);
}); 
 


gulp.task("transpile-curly", function () {
  var tsResult = gulp
        .src(["src/**/*.ts", "typings/greensock.d.ts"]) 
        .pipe(sourcemaps.init())
        .pipe(ts({
          "target": "ES5",
          "declaration": true,
          "noImplicitAny": false,
          "removeComments": false,
          "noLib": false,
          "out": "curly.js",
          "noExternalResolve":true  
        }));
        
  return merge([
    tsResult.dts.pipe(gulp.dest("typings")),
    tsResult
      .js
      .pipe(sourcemaps.write("/", {
          sourceRoot:"../../src/"
      }))
      // .pipe(uglify())
      .pipe(gulp.dest("deploy"))
    ]);
      
});

gulp.task("rollup-curly", ["transpile-curly"], function(){
  gulp.src(["libs/TweenMax.min.js", "deploy/curly.js"])
    .pipe(concat("curly.min.js"))
    .pipe(gulp.dest("deploy"));
});

gulp.task("default", ["reload", "webserver", "watch-curly"]);