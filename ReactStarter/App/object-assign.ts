interface Object {
    assign(target: Object, ...others: Object[]);
}

module AssignPolyfill {

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

    export function assign2(target: Object, ...others: Object[]) {
        return Object.assign(target, ...others);
    }

}

