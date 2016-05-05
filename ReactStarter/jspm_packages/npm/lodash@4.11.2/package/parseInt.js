/* */ 
var root = require('./_root'),
    toString = require('./toString');
var reTrim = /^\s+|\s+$/g;
var reHasHexPrefix = /^0x/i;
var nativeParseInt = root.parseInt;
function parseInt(string, radix, guard) {
  if (guard || radix == null) {
    radix = 0;
  } else if (radix) {
    radix = +radix;
  }
  string = toString(string).replace(reTrim, '');
  return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
}
module.exports = parseInt;
