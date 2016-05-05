var AssignPolyfill;
(function (AssignPolyfill) {
    if (typeof Object.prototype['assign'] != 'function') {
        (function () {
            Object.prototype.assign = function (target) {
                'use strict';
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        })();
    }
    function assign2(target) {
        var others = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            others[_i - 1] = arguments[_i];
        }
        return Object.assign.apply(Object, [target].concat(others));
    }
    AssignPolyfill.assign2 = assign2;
})(AssignPolyfill || (AssignPolyfill = {}));
//# sourceMappingURL=object-assign.js.map