var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var prefix = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');
var bs = require('browser-sync').create();
var rename = require('gulp-rename');
var stripCssComments = require('gulp-strip-css-comments');

gulp.task('imagemin', function (done) {
  gulp.src('./images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./images'));
});

// Add browsersync.
gulp.task('browser-sync', ['sass'], function() {
  bs.init({
    logPrefix: 'Dvele Local site',
    baseDir: './',
    open: false,
    notify: true,
    proxy: 'dvele.docksal',
    host: 'dvele.docksal',
    openBrowserAtStart: false,
    reloadOnRestart: true,
    ui: false,
    port: 3050
  });
});

gulp.task('sass', function () {
  return gulp.src(['./sass/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: [
        './node_modules/breakpoint-sass/stylesheets',
      ],
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'))
    .pipe(rename({ suffix: '.dev' }))
    .pipe(stripCssComments())
    .pipe(gulp.dest('./css-dev'))
    .pipe(bs.reload({stream: true}))
});

gulp.task('uglify', function(done) {
  gulp.src([
    './node_modules/foundation-sites/dist/js/foundation.js',
    './lib/*.js'
  ])
    .pipe(uglify('main.js'))
    .pipe(gulp.dest('./js'));
});

// browser-sync watch.
gulp.task('watch', ['browser-sync'], function () {
  gulp.watch("./sass/**/*.scss", ['sass']).on('change', bs.reload);
  gulp.watch("./templates/**/*.html.twig").on('change', bs.reload);
  gulp.watch("./js/**/*.js").on('change', bs.reload);
});

gulp.task('build', ['sass', 'uglify']);
