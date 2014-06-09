var gulp = require('gulp');
var browserify = require('gulp-browserify');
var docco = require("gulp-docco");
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  // place code for your default task here
  console.log("hello, world!");
});

gulp.task('compress', function() {
  gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('docs', function () {
  gulp.src("./src/js/*.js")
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});

gulp.task('package-all', function() {
    // Single entry point to browserify
    gulp.src('src/js/all.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'));
});
