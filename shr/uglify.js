var UglifyJS = require("uglify-js");
var fs = require('fs');
var path = require('path');
let PUBLIC_PATH = path.resolve(__dirname, '../shr');
var code = fs.readFileSync(PUBLIC_PATH+"\\test.js", "utf8");

UglifyJS.minify(code).code;
// 'function funcName(a,n){}var globalVar;'

UglifyJS.minify(code, { mangle: { reserved: ['firstLongName'] } }).code;
// 'function funcName(firstLongName,a){}var globalVar;'

UglifyJS.minify(code, { mangle: { toplevel: true } }).code;