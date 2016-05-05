/* */ 
var baseRepeat = require('./_baseRepeat'),
    isIterateeCall = require('./_isIterateeCall'),
    toInteger = require('./toInteger'),
    toString = require('./toString');
function repeat(string, n, guard) {
  if ((guard ? isIterateeCall(string, n, guard) : n === undefined)) {
    n = 1;
  } else {
    n = toInteger(n);
  }
  return baseRepeat(toString(string), n);
}
module.exports = repeat;
