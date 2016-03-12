System.register(['react', 'react-dom'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var React, ReactDom;
    var HelloComponent;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (ReactDom_1) {
                ReactDom = ReactDom_1;
            }],
        execute: function() {
            HelloComponent = (function (_super) {
                __extends(HelloComponent, _super);
                function HelloComponent() {
                    _super.apply(this, arguments);
                }
                HelloComponent.prototype.render = function () {
                    return React.createElement("h1", null, "Hello ", this.props.message, "!");
                };
                return HelloComponent;
            }(React.Component));
            ReactDom.render(React.createElement(HelloComponent, {message: "World"}), document.body);
        }
    }
});
//# sourceMappingURL=HelloWorld.js.map