/* */ 
var toString = require('./toString');
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
    reHasRegExpChar = RegExp(reRegExpChar.source);
function escapeRegExp(string) {
  string = toString(string);
  return (string && reHasRegExpChar.test(string)) ? string.replace(reRegExpChar, '\\$&') : string;
}
module.exports = escapeRegExp;
