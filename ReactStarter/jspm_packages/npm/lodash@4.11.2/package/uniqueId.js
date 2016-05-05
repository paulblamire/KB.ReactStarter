/* */ 
var toString = require('./toString');
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}
module.exports = uniqueId;
