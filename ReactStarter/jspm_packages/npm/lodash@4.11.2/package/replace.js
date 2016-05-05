/* */ 
var toString = require('./toString');
var stringProto = String.prototype;
var nativeReplace = stringProto.replace;
function replace() {
  var args = arguments,
      string = toString(args[0]);
  return args.length < 3 ? string : nativeReplace.call(string, args[1], args[2]);
}
module.exports = replace;
