/* */ 
var baseClamp = require('./_baseClamp'),
    baseToString = require('./_baseToString'),
    toInteger = require('./toInteger'),
    toString = require('./toString');
function endsWith(string, target, position) {
  string = toString(string);
  target = baseToString(target);
  var length = string.length;
  position = position === undefined ? length : baseClamp(toInteger(position), 0, length);
  position -= target.length;
  return position >= 0 && string.indexOf(target, position) == position;
}
module.exports = endsWith;
