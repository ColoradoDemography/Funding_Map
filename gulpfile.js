
(function () {
   'use strict';

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var mocha  = require('gulp-mocha');
  var coveralls = require('gulp-coveralls');
  
gulp.task('lint', function() {
  return gulp
    .src(['gulpfile.js', 'js/app.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

 gulp.task('test', function() {
   return gulp
     .src('test/test.js')
     .pipe(mocha());
 });
  
gulp.task('coveralls', function () {  
  return gulp.src('./test/coverage/file.lcov')
    .pipe(coveralls());
});
  
  
gulp.task('default', ['lint', 'test', 'coveralls'], function() {


  
});


  
  }());