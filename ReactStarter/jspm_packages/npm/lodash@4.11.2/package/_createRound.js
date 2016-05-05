/* */ 
var toInteger = require('./toInteger'),
    toNumber = require('./toNumber'),
    toString = require('./toString');
function createRound(methodName) {
  var func = Math[methodName];
  return function(number, precision) {
    number = toNumber(number);
    precision = toInteger(precision);
    if (precision) {
      var pair = (toString(number) + 'e').split('e'),
          value = func(pair[0] + 'e' + (+pair[1] + precision));
      pair = (toString(value) + 'e').split('e');
      return +(pair[0] + 'e' + (+pair[1] - precision));
    }
    return func(number);
  };
}
module.exports = createRound;
