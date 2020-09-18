'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var stripCssComments = require('gulp-strip-css-comments');
var svgSprite = require('gulp-svg-sprite')
var uglify = require('gulp-uglifyjs');
var cssmin = require('gulp-cssmin');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var sassGlob = require('gulp-sass-glob');

var sass_config = {
  includePaths: [
    'node_modules/breakpoint-sass/stylesheets/',
    'node_modules/singularitygs/stylesheets/',
    'node_modules/modularscale-sass/stylesheets',
    'node_modules/compass-mixins/lib/',
    'node_modules/susy/sass/',
    'node_modules/breakpoint-sass/stylesheets',
    'node_modules/compass-sass-mixins/lib/',
    'node_modules/foundation-sites/scss/util/util',
    'node_modules/foundation-sites/scss/foundation',
    'node_modules/foundation-sites/scss/util/color',
    'node_modules/motion-ui/src'
  ],
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('imagemin', function (done) {
  gulp.src('./images/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./images'));
  done();
});

gulp.task('sass', function (done) {
  gulp.src(['./images/icons/view/*.scss', './sass/**/*.scss'])
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass(sass_config).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(stripCssComments({preserve: false}))
    .pipe(sourcemaps.write('.'))
    .pipe(cssmin())
    .pipe(gulp.dest('./css'));
  done();
});

gulp.task('uglify', function(done) {
  gulp.src([
    './node_modules/foundation-sites/dist/js/foundation.js',
    './lib/*.js'
  ])
  .pipe(uglify('main.js'))
  .pipe(gulp.dest('./js'));
  done();
});

// Add browsersync.
gulp.task('browser-sync', gulp.series('sass', function(done) {
  browserSync.init({
    logPrefix: 'Local site',
    baseDir: './',
    open: false,
    notify: true,
    proxy: process.env.VIRTUAL_HOST,
    host: process.env.VIRTUAL_HOST,
    openBrowserAtStart: false,
    reloadOnRestart: true,
    ui: false,
    port: 3050
  });
  done();
}));

gulp.task('breakout', function(done){
  gulp.src('./sass/**/*.scss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass(sass_config).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./css/individual'));


  gulp.src([
    './node_modules/foundation-sites/dist/js/**/*.js',
    './lib/*.js'
  ])
  .pipe(gulp.dest('./js/individual'));

  done();
})

// browser-sync watch.
gulp.task('watch', gulp.series('browser-sync', function (done) {
  var options = {interval: 1000, usePolling: true};
  gulp.watch("./sass/**/*.scss", options, gulp.series('sass')).on('change', browserSync.reload);
  gulp.watch("./templates/**/*.html.twig", options).on('change', browserSync.reload);
  gulp.watch("./js/**/*.js", options).on('change', browserSync.reload);
}));

gulp.task('build', gulp.series('sass', 'uglify'));

gulp.task('default', gulp.series('build', function(done){
  done();
}));