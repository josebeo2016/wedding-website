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
    gulp.src('./index.html', {encoding: false})
        .pipe(gulp.dest('./src'));
    // gulp.src('./thiep.html')
    //     .pipe(gulp.dest('./src'));
    // gulp.src('./thiep-vuquy.html')
    //     .pipe(gulp.dest('./src'));
    gulp.src('./img/*', {encoding: false})
        .pipe(gulp.dest('./src/img'));
    gulp.src('./img/album/*', {encoding: false})
        .pipe(gulp.dest('./src/img/album'));
    gulp.src('./fonts/*', {encoding: false})
        .pipe(gulp.dest('./src/fonts'));
    gulp.src('./fonts/UVN-font/*', {encoding: false})
        .pipe(gulp.dest('./src/fonts/UVN-font'));
    gulp.src('./js/vendor/*', {encoding: false})
        .pipe(gulp.dest('./src/js/vendor'));
    gulp.src('./browserconfig.xml', {encoding: false})
        .pipe(gulp.dest('./src'));
    gulp.src('./favicon.ico', {encoding: false})
        .pipe(gulp.dest('./src'));
    gulp.src('./*.png', {encoding: false})
        .pipe(gulp.dest('./src'));
    gulp.src('./manifest.json', {encoding: false})
        .pipe(gulp.dest('./src'));
    gulp.src('./js/*', {encoding: false})
        .pipe(gulp.dest('./src/js'));
    gulp.src('./css/*', {encoding: false})
        .pipe(gulp.dest('./src/css'));
    gulp.src('./musics/*', {encoding: false})
        .pipe(gulp.dest('./src/musics'));
    done();
});

// default task
gulp.task('default', gulp.series('sass', 'minify-js', 'copy'));