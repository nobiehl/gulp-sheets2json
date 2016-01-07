'use strict';
var xlsx = require('xlsx'),
    gutil = require('gulp-util'),
    through = require('through2'),
    minimatch = require("minimatch"),
    File = require('vinyl');

var PLUGIN_NAME = "gulp-sheets2json";

/**
 * parses a single sheet
 */
function parseSheet(sheet) {
    var json = [],        
        namemap = [];

    for (var key in sheet) {
        if (sheet.hasOwnProperty(key)) {
            var cell = sheet[key],
                match = /([A-Z]+)(\d+)/.exec(key);

            if (!match) {
                continue;
            }

            var col = match[1], // ABCD
                row = parseInt(match[2], 10) - 1, // 1234
                value = cell.v;

            if (row === 0) { // 1st row is the header
                namemap[col] = value;
            } else {
                var idx =  row - 1; // row 1 + n are data 
                if (json.length < idx) {
                    // increase array length if nessesary
                    json.length = idx + 1
                }                
                json[idx] = json[idx] || {};                                                    
                json[idx][namemap[col]] = value;
            }
        }
    }
    return json;
};

/**
 * parses all sheets
 */
function parseSheets(workbook, filter) {
    var out = [];

    for (var i = 0; i < workbook.SheetNames.length; i++) {
        var sheetName = workbook.SheetNames[i];

        if (filter && !minimatch(sheetName, filter)) {
            continue;
        }

        if (workbook.Sheets.hasOwnProperty(sheetName)) {
            var sheet = workbook.Sheets[sheetName];

            if (!sheet || !sheet["!ref"]) {
                // IGNORE EMPTY SHEETS          
                continue;
            }

            out.push({
                Name: sheetName,
                Data: parseSheet(sheet)
            });
        }
    }
    return out;
}

/**
 * loads a work book
 */
function loadWorkbook(file) {
    if (typeof file === 'string') {
        return xlsx.readFile(file);
    }

    var arr = [];

    for (var i = 0; i < file.contents.length; ++i) {
        arr[i] = String.fromCharCode(file.contents[i]);
    }

    var bString = arr.join("");    
    return xlsx.read(bString, { type: "binary" });
}

/**
 * runs the conversion process
 */
function process(plugin, options, file) {
    options = options || {};
    
    var workbook = loadWorkbook(file);
    var sheets = parseSheets(workbook, options["filter"] || "*");

    for (var i = 0; i < sheets.length; i++) {              
        var sheet = sheets[i],
            name = sheet.Name,
            json = JSON.stringify(sheet.Data),
            buffer = new Buffer(json);
            
        var newFile = new File({
            path: [name, "json"].join('.'),
            contents: buffer
        });        
        plugin.push(newFile);
    }
}

function sheets2json(options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        process(this, options, file);

        return cb();
    });
};

module.exports = sheets2json;