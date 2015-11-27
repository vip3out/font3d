var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sort = require('gulp-sort'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del');

var defaultPath = 'src/',
    defaultFinalPath = 'public/';

gulp.task('styles', function() {
  return sass(defaultPath + 'Scss/theme.scss')
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(defaultFinalPath + 'Css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(defaultFinalPath + 'Css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(defaultPath + 'Javascript/main.js')
    .pipe(rename({basename: "theme"}))
    .pipe(gulp.dest(defaultFinalPath + 'Javascript'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(defaultFinalPath + 'Javascript'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('lib', function() {
  return gulp.src(defaultPath + 'Javascript/vendor/**/*.js')
    .pipe(sort())
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(defaultFinalPath + 'Javascript'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(defaultFinalPath + 'Javascript'))
    .pipe(notify({ message: 'Library Scripts task complete' }));
});

gulp.task('clean', function(cb) {
    del([defaultFinalPath + 'Css', defaultFinalPath + 'Javascript'], cb)
});

gulp.task('default', function() {
    gulp.start('styles');
});

gulp.task('watch', function() {
  gulp.watch(defaultPath + 'Scss/**/*.scss', ['styles']);
});
