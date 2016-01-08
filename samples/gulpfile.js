var gulp = require('gulp'),
    s2j = require('../lib/sheets2json');

gulp.task("bulid:json", function () {
    gulp.src("SampleBook.xlsx")
        .pipe(s2j({ filter: "+(First|Second)" }))
        // do some further stuff (transform, beautify, etc.)
        .pipe(gulp.dest('.out'));
});

gulp.task("default", ["bulid:json"], function () {
    gulp.watch("SampleBook.xlsx", ["bulid:json"])
});