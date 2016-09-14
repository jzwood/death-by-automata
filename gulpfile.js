'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    es6transpiler = require('gulp-es6-transpiler'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin')

var path = {
  'sass' : 'public/stylesheets/**/*.scss',
  'es6' : 'public/javascripts/es6/**/*.js',
}, dest = {
  'es6' : 'public/javascripts',
}

// gulp.task('image-min', () =>
//     gulp.src('src/assets/**')
//         .pipe(imagemin())
//         .pipe(gulp.dest('build/assets'))
// )

// autoprefixes & minifies css
gulp.task('sass', function () {
  return gulp.src(path.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      dirname: "stylesheets",
      extname: ".css"
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public'))
})

// merges all js into one file & uglifies
gulp.task('es6', function() {
  return gulp.src(path.es6)
    .pipe(concat('main.js'))
    .pipe(es6transpiler())
    .pipe(uglify())
    .pipe(gulp.dest(dest.es6))
})

gulp.task('watch', function() {
    gulp.watch(path.sass, ['sass'])
    gulp.watch(path.es6, ['es6'])
})

gulp.task('default',['sass','es6','watch'])
