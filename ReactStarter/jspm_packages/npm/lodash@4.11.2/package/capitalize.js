/* */ 
var toString = require('./toString'),
    upperFirst = require('./upperFirst');
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}
module.exports = capitalize;
