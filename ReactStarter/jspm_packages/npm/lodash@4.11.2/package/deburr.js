/* */ 
var deburrLetter = require('./_deburrLetter'),
    toString = require('./toString');
var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0';
var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';
var reComboMark = RegExp(rsCombo, 'g');
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
}
module.exports = deburr;
