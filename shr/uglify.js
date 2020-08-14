var UglifyJS = require("uglify-js");
var fs = require('fs');
var path = require('path');
let PUBLIC_PATH = path.resolve(__dirname, '../shr');
var filesContents = ['test.js', 'test2.js'].map(function(file) {
    var fileResult = fs.readFileSync(PUBLIC_PATH + '\\' + file, 'utf8');
    let result = UglifyJS.minify(fileResult).code;
    return result;
});
var filesStr = filesContents.join('');
fs.writeFileSync(PUBLIC_PATH + "\\bundle.js", filesStr);