/* */ 
var castSlice = require('./_castSlice'),
    reHasComplexSymbol = require('./_reHasComplexSymbol'),
    stringToArray = require('./_stringToArray'),
    toString = require('./toString');
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);
    var strSymbols = reHasComplexSymbol.test(string) ? stringToArray(string) : undefined;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
module.exports = createCaseFirst;
