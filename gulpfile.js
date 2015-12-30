var gulp = require('gulp');
var jshint = require('gulp-jshint');
var prettify = require('gulp-jsbeautifier');


// Lint
gulp.task('lint', function() {
  return gulp.src('./js/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('format-js', function() {
  gulp.src('./js/app.js')
    .pipe(prettify({config: '.jsbeautifyrc', mode: 'VERIFY_AND_WRITE'}))
    .pipe(gulp.dest('./js'))
});

gulp.task('prettify-html', function() {
  gulp.src('./index.html')
    .pipe(prettify({indentSize: 2}))
    .pipe(gulp.dest('./'))
});

gulp.task('prettify-css', function() {
  gulp.src('./css/app.css')
    .pipe(prettify({indentSize: 2}))
    .pipe(gulp.dest('./css'))
});

// Default
gulp.task('default', ['lint', 'format-js','prettify-html', 'prettify-css']);