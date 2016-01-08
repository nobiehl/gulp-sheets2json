var s2j = require('../lib/sheets2json'),
    xlsx = require('xlsx'),
    fs = require('fs'),    
    assert = require('assert'),
    File = require('vinyl');
    
var file = new File({
    path: 'Book1.xlsx',
    contents: fs.readFileSync('tests\\Book1.xlsx')
});

var proc = s2j();

proc.write(file);

proc.on('data', function(data){    
    console.log(JSON.stringify(JSON.parse(data.contents.toString()), null, "\t"));
});
