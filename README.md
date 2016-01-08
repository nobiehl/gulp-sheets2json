# Excel sheets to json converter #

+ Simple gulp plugin for converting excel sheets into json files. 

    + Creates a JSON file for each sheet. The name of the file is equal to the name of the sheet (tab).

    + You can choose which sheet should be exported, by using a filter. Filters can be defined as - minimatch - expession.

### Version ###

0.0.1

### Install ###

npm install gulp-sheets2json

### Usage ###

* * *

```
#!javascript

var gulp = require('gulp'),
s2j = require('gulp-sheets2json'),

var gulp = require('gulp'),
    s2j = require('./lib/sheets2json');
    
gulp.task("bulid:json", function () {
    gulp.src("tests/Book1.xlsx")
        .pipe(s2j({ filter: "First" }))
        // do some further stuff (transform, beautify, etc.)
        .pipe(gulp.dest('json'));
});

gulp.task("default", ["bulid:json"], function () {
    gulp.watch("tests/Book1.xlsx", ["bulid:json"])
});


```
* * *

### Dependencies ###
gulp-util, minimatch, through2, vinyl, xlsx
