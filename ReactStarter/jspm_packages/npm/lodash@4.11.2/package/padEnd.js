/* */ 
var createPadding = require('./_createPadding'),
    stringSize = require('./_stringSize'),
    toInteger = require('./toInteger'),
    toString = require('./toString');
function padEnd(string, length, chars) {
  string = toString(string);
  length = toInteger(length);
  var strLength = length ? stringSize(string) : 0;
  return (length && strLength < length) ? (string + createPadding(length - strLength, chars)) : string;
}
module.exports = padEnd;
