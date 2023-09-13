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
        .pipe(gulp.dest('./css'));
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
        .pipe(gulp.dest('./js'));
});

// copy index and images to src
gulp.task('copy', function (done) {
    gulp.src('./index.html')
        .pipe(gulp.dest('./src'));
    gulp.src('./img/*')
        .pipe(gulp.dest('./src/img'));
    gulp.src('./img/album/*')
        .pipe(gulp.dest('./src/img/album'));
    gulp.src('./fonts/*')
        .pipe(gulp.dest('./src/fonts'));
    gulp.src('./js/vendor/*')
        .pipe(gulp.dest('./src/js/vendor'));
    gulp.src('./browserconfig.xml')
        .pipe(gulp.dest('./src'));
    gulp.src('./favicon.ico')
        .pipe(gulp.dest('./src'));
    gulp.src('./*.png')
        .pipe(gulp.dest('./src'));
    gulp.src('./manifest.json')
        .pipe(gulp.dest('./src'));
    gulp.src('./js/*')
        .pipe(gulp.dest('./src/js'));
    gulp.src('./css/*')
        .pipe(gulp.dest('./src/css'));
    done();
});

// default task
gulp.task('default', gulp.series('sass', 'minify-js', 'copy'));