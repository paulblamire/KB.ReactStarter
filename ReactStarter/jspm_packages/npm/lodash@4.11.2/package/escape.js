/* */ 
var escapeHtmlChar = require('./_escapeHtmlChar'),
    toString = require('./toString');
var reUnescapedHtml = /[&<>"'`]/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
function escape(string) {
  string = toString(string);
  return (string && reHasUnescapedHtml.test(string)) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
}
module.exports = escape;
