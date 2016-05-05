/* */ 
var baseToString = require('./_baseToString'),
    castSlice = require('./_castSlice'),
    charsEndIndex = require('./_charsEndIndex'),
    charsStartIndex = require('./_charsStartIndex'),
    stringToArray = require('./_stringToArray'),
    toString = require('./toString');
var reTrim = /^\s+|\s+$/g;
function trim(string, chars, guard) {
  string = toString(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrim, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1;
  return castSlice(strSymbols, start, end).join('');
}
module.exports = trim;
