var gulp = require('gulp'),
    print = require('gulp-print'),
    s2j = require('../lib/sheets2json');
    

gulp.task("bulid:json", function () {
    gulp.src("SampleBook.xlsx")
        .pipe(print())
        .pipe(s2j(/*{ filter: "+(First|Second)" }*/))
        .pipe(print())
        // do some further stuff (transform, beautify, etc.)
        .pipe(gulp.dest('.out'));
});

gulp.task("default", ["bulid:json"], function () {
    gulp.watch("SampleBook.xlsx", ["bulid:json"])
});