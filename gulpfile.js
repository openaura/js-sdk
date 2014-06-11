var gulp = require('gulp');
var gulp_browserify = require('gulp-browserify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
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

gulp.task('reqtest', function() {
  var OA = require('./src/js/all'),
      artist_id = 2;

  console.log('*^*^*^*^*^* Initializing OA SDK');
  OA.initialize({"api_key": "brian-test"})

  console.log('*^*^*^*^*^* Pulling up OA.ArtistInfo.fetchByOaArtistId');
  OA.ArtistInfo.fetchByOaArtistId(artist_id, function(ai) {
    console.log('*^*^*^*^*^* asObject():');
    console.dir(ai.asObject());
  });
});

gulp.task('test-restler', function() {
  var restler = require('restler'),
      params = { id_type: 'oa:artist_id', limit: 100, api_key: 'brian-test' },
      url = 'http://api.openaura.com/v1/info/artists/2',
      options = {
        method: 'GET',
        query: params
      };

  restler.get(url, options)
         .on('success', function(data, response) {
           console.log('SUCCESS');
           console.log('data:');
           console.dir(data);
         });
});

gulp.task('docs', function () {
  gulp.src("./src/js/*.js")
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});

gulp.task('package-all', function() {
    // Single entry point to browserify
    gulp.src('src/js/all.js')
        .pipe(gulp_browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('package-moar', function() {
  return browserify('./src/js/all.js')
        .bundle()
        .pipe(source('oa-all.js'))
        .pipe(gulp.dest('./build/js/'));
});
