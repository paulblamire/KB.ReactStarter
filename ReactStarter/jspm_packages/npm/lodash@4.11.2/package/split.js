/* */ 
var baseToString = require('./_baseToString'),
    castSlice = require('./_castSlice'),
    isIterateeCall = require('./_isIterateeCall'),
    isRegExp = require('./isRegExp'),
    reHasComplexSymbol = require('./_reHasComplexSymbol'),
    stringToArray = require('./_stringToArray'),
    toString = require('./toString');
var MAX_ARRAY_LENGTH = 4294967295;
var stringProto = String.prototype;
var nativeSplit = stringProto.split;
function split(string, separator, limit) {
  if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
    separator = limit = undefined;
  }
  limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
  if (!limit) {
    return [];
  }
  string = toString(string);
  if (string && (typeof separator == 'string' || (separator != null && !isRegExp(separator)))) {
    separator = baseToString(separator);
    if (separator == '' && reHasComplexSymbol.test(string)) {
      return castSlice(stringToArray(string), 0, limit);
    }
  }
  return nativeSplit.call(string, separator, limit);
}
module.exports = split;
