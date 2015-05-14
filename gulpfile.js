'use strict';

var gulp = require('gulp');

gulp.paths = {
  app: 'app',
  tasks: 'tasks'
};

gulp.plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

require('require-dir')('./' + gulp.paths.tasks);
