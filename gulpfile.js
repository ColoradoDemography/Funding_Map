
(function () {
   'use strict';

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var mocha  = require('gulp-mocha');

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

gulp.task('default', ['lint', 'test'], function() {
  //gulp.watch(['js/app.js', 'test/test.js'], function() {
    //gulp.start('lint', 'test'); 
  //});
});

  
  }());