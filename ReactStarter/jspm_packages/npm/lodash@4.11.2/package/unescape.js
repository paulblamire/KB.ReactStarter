/* */ 
var toString = require('./toString'),
    unescapeHtmlChar = require('./_unescapeHtmlChar');
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
    reHasEscapedHtml = RegExp(reEscapedHtml.source);
function unescape(string) {
  string = toString(string);
  return (string && reHasEscapedHtml.test(string)) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
}
module.exports = unescape;
