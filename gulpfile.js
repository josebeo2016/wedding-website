'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./src/css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./src/js'));
});

// copy index and images to src
gulp.task('copy', function () {
    gulp.src('./index.html')
        .pipe(gulp.dest('./src'));
    gulp.src('./img/*')
        .pipe(gulp.dest('./src/img'));
    gulp.src('./fonts/*')
        .pipe(gulp.dest('./src/fonts'));
    gulp.src('./vendor/*')
        .pipe(gulp.dest('./src/vendor'));
    gulp.src('./browserconfig.xml')
        .pipe(gulp.dest('./src'));
    gulp.src('./*.png')
        .pipe(gulp.dest('./src'));
    gulp.src('./manifest.json')
        .pipe(gulp.dest('./src'));
});

// default task
gulp.task('default', gulp.series('sass', 'minify-js', 'copy'));