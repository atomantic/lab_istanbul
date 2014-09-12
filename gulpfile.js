/*!
 * gulp
 * $ npm install gulp gulp-jshint gulp-supervisor opn --save-dev
 */
var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    supervisor  = require('gulp-supervisor'),
    lab         = require('gulp-lab'),
    istanbul    = require('gulp-istanbul'),
    opn         = require('opn');

var server = {
    host: 'localhost',
    port: '46000'
};

var sourcePaths = {
  app: ['index.js'],
  test: ['test/*.js']
};

// Scripts
gulp.task('js', function() {
  return gulp.src(sourcePaths.app)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task( 'supervise', function() {
    supervisor( 'index.js', {
        args: [],
        watch: sourcePaths.app,
        pollInterval: 500,
        extensions: [ 'js' ],
        exec: 'node',
        debug: true,
        debugBrk: false,
        harmony: true,
        noRestartOn: false,
        forceWatch: true,
        quiet: false
    } );
} );

gulp.task('test', function (cb) {

  // using only lab
  // return gulp.src(sourcePaths.test)
  //   // https://github.com/hapijs/lab/issues/206
  //   .pipe(lab('-v -C -l -m 0')) // developer output
  //   .pipe(lab('-c -r html -l -o coverage/lab.html -m 0'));

  // using istanbul
  // https://github.com/SBoudrias/gulp-istanbul/issues/37
  gulp.src(sourcePaths.app)
    .pipe(istanbul({includeUntested:true})) // Covering files
    .on('finish', function () {
      gulp.src(['test/m4.test.js'])
      .pipe(lab('-v -C -l -m 0')) // developer output
      .pipe(istanbul.writeReports()) // Creating the reports after tests runned
      .on('end', cb);
    });
});

gulp.task('openbrowser', function() {
  // supervise takes a second to start it up
  setTimeout(function(){
    opn( 'http://' + server.host + ':' + server.port );
  }, 1500);
});

// Watch
gulp.task('watch', function() {

  // Watch .js files
  gulp.watch(['./*.js','test/*.js'], ['js']);

});

gulp.task('default', ['supervise', 'watch', 'openbrowser']);
gulp.task('build', ['js', 'test']);
