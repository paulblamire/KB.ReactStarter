System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var truthy;
    return {
        setters:[],
        execute: function() {
            truthy = function (x) { return x; };
            exports_1("default",function (theme) { return function (key) {
                var names = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    names[_i - 1] = arguments[_i];
                }
                var styles = names
                    .map(function (name) { return theme[name]; })
                    .filter(truthy);
                return typeof styles[0] === 'string' ?
                    { key: key, className: styles.join(' ') } :
                    { key: key, style: Object.assign.apply(Object, [{}].concat(styles)) };
            }; });
        }
    }
});
//# sourceMappingURL=react-themeable.js.map