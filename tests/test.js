var xlsx = require('xlsx'),
    fs = require('fs'),
    s2j = require('./sheets2json'),
    assert = require('assert'),
    File = require('vinyl');

var file = new File({
    path: 'Book1.xlsx',
    contents: fs.readFileSync('Book1.xlsx')
});

var proc = s2j();

proc.write(file);

proc.on('data', function(data){    
    console.log(data.contents.toString());
});
