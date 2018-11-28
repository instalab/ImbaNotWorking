const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const glob = require('glob').sync
const rename = require('gulp-rename')

sass.compiler = require('node-sass')

gulp.task('html', function(){
  const cssFiles = []
  for (let f of glob('./src/styles/**/*.scss')) {
    cssFiles.push('/style/' + f.slice(13, -4) + 'css')
  }
  return gulp.src('./src/app.pug')
    .pipe(pug({data: {css: cssFiles}}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'))
});

gulp.task('sass', function () {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/style'))
})

gulp.task('assets', function () {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['sass', 'html', 'assets'])
gulp.task('watch', function () {
  gulp.watch('./src/styles/**/*.scss', ['sass', 'html'])
  gulp.watch('./src/*.pug', ['html'])
  gulp.watch('./src/assets', ['assets'])
})
