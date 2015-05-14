'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var plugins = gulp.plugins;

function runJscs(paths, fix, done) {
  var tasks = [];
  paths.forEach(function(path) {
    gulp.task(path, function() {
      if (fix) {
        return gulp.src(path + '/**/*.js')
          .pipe(plugins.jscs({
            configPath: '.jscsrc',
            fix: true
          }))
          .pipe(gulp.dest(path));
      } else {
        return gulp.src(path + '/**/*.js')
          .pipe(plugins.jscs({
            configPath: '.jscsrc'
          }));
      }
    });
  });
  return plugins.sequence(paths, done);
}

gulp.task('jscs', [], function(done) {
  return runJscs([paths.app, paths.tasks], false, done);
});
