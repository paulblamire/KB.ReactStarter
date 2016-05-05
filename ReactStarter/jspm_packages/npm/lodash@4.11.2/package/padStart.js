/* */ 
var createPadding = require('./_createPadding'),
    stringSize = require('./_stringSize'),
    toInteger = require('./toInteger'),
    toString = require('./toString');
function padStart(string, length, chars) {
  string = toString(string);
  length = toInteger(length);
  var strLength = length ? stringSize(string) : 0;
  return (length && strLength < length) ? (createPadding(length - strLength, chars) + string) : string;
}
module.exports = padStart;
