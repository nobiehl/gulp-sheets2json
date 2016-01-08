# Excel sheets to json converter #

+ Simple gulp plugin for converting excel sheets into json files.

    + Creates a JSON file for each sheet. The name of the file is equal to the name of the sheet (tab)

    + You can choose which sheet should be exported, by using a filter. Filters can be defined as - minimatch - expession
    
    + If you want to ignore some columns you can add an exclamation mark (!) at the very beginning of the column header
    
    + Ignores sheets which name starts with a exclamation mark (!)
    
    + Ignores empty sheets        

### Version ###

1.0.1

### Install ###

npm install gulp-sheets2json

### Usage ###

* * *
```
#!javascript

var gulp = require('gulp'),
    s2j = require('gulp-sheets2json');

gulp.task("bulid:json", function () {
    gulp.src("SampleBook.xlsx")
        .pipe(s2j({ filter: "+(First|Second)" }))
        // do some further stuff (transform, beautify, etc.)
        .pipe(gulp.dest('.out'));
});

gulp.task("default", ["bulid:json"], function () {
    gulp.watch("SampleBook.xlsx", ["bulid:json"])
});

```
* * *

### Dependencies ###
gulp-util, minimatch, through2, vinyl, xlsx
