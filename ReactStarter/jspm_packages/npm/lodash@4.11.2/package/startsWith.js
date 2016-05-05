/* */ 
var baseClamp = require('./_baseClamp'),
    baseToString = require('./_baseToString'),
    toInteger = require('./toInteger'),
    toString = require('./toString');
function startsWith(string, target, position) {
  string = toString(string);
  position = baseClamp(toInteger(position), 0, string.length);
  return string.lastIndexOf(baseToString(target), position) == position;
}
module.exports = startsWith;
