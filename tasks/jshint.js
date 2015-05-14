'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var plugins = gulp.plugins;

function runJshint(paths, done) {
  var tasks = [];
  paths.forEach(function(path) {
    gulp.task(path, function() {
      return gulp.src(path + '/**/*.js')
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'));
    });
  });
  return plugins.sequence(paths, done);
}

gulp.task('jshint', ['jscs'], function(done) {
  return runJshint([paths.app, paths.tasks], done);
});
