var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('default', function() {
  // place code for your default task here
  console.log("hello, world!");
});

// Basic usage
var uglify = require('gulp-uglify');

gulp.task('compress', function() {
  gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
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
