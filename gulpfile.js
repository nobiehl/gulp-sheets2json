var gulp = require('gulp'),
s2j = require('./sheets2json'),
beautify = require('gulp-beautify');

gulp.task("bulid:json", function () {
    gulp.src("./Book1.xlsx")
        .pipe(s2j({filter: "First"}))
        .pipe(beautify())
        .pipe(gulp.dest('json'));
});

gulp.task("watch", ["bulid:json"], function(){
    gulp.watch("test.js", ["bulid:json"])
});

gulp.task("default", ["watch"]);