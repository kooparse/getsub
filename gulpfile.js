var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    del           = require('del'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    sourcemaps    = require('gulp-sourcemaps'),
    autoprefixer  = require('gulp-autoprefixer'),
    nodemon       = require('gulp-nodemon'),
    browserify    = require('browserify'),
    reactify      = require('reactify'),
    babelify      = require('babelify'),
    buffer        = require('vinyl-buffer'),
    source        = require('vinyl-source-stream');


/*
 *
 * ***** DEV *****
 *
*/


gulp.task('dev-js', function () {
  return browserify({
    entries: ['./app/js/main.js']
  })
  .transform(babelify)
  .transform('reactify')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./app/js/'));
});

gulp.task('dev-css', function () {
  return gulp.src('./app/public/stylesheets/sass/main.scss')
          .pipe(sourcemaps.init())
          .pipe(sass())
          .pipe(sourcemaps.write())
          .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
          }))
          .pipe(gulp.dest('./app/public/stylesheets/'));
});

gulp.task('watch', function() {
	gulp.watch(['./app/js/**', './app/public/stylesheets/sass/**', '!./app/js/bundle.js'], gulp.parallel('dev-js', 'dev-css'));
});

gulp.task('nodemon', function () {
  nodemon({ script: 'server.js', env: { 'NODE_ENV': 'dev' }, execMap: { js: 'iojs' }, ext: 'json js', ignore: ['./app', './node_modules', './build'] })
  .on('start', function () {
    console.log('started...');
  })
  .on('restart', function () {
    console.log('restarted!');
  });
});


/*
 *
 * ***** BUILD *****
 *
*/


gulp.task('build-clean', function (cb) {
  del('./build', cb);
});

gulp.task('build-js', function () {
  return browserify({
    entries: ['./app/js/main.js']
  })
    .transform(babelify)
    .transform('reactify')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('build-css', function () {
  return gulp.src('./app/public/stylesheets/sass/main.scss')
          .pipe(sass({style: 'compressed'}))
          .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
          }))
          .pipe(gulp.dest('./build/public/stylesheets/'));
});

gulp.task('build-fonts', function () {
  return gulp.src('./app/public/fonts/**')
      .pipe(gulp.dest('./build/public/fonts/'));
});

gulp.task('build-images', function () {
  return gulp.src('./app/public/images/**')
      .pipe(gulp.dest('./build/public/images/'));
});

gulp.task('build-favicon', function () {
  return gulp.src('app/public/favicon.ico')
      .pipe(gulp.dest('build/public/'));
});

gulp.task('build-robots', function () {
  return gulp.src('app/public/Robots.txt')
      .pipe(gulp.dest('build/'));
});



/*
 *
 * ***** LAUNCH *****
 *
*/


gulp.task('default', gulp.parallel('dev-js', 'dev-css', 'nodemon', 'watch'));

gulp.task('build', gulp.series('build-clean', 'build-js', 'build-css', 'build-fonts', 'build-images', 'build-robots', 'build-favicon'));
