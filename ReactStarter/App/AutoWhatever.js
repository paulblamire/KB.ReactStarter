// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
System.register(['react', './section-iterator', './react-themeable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var React, section_iterator_1, react_themeable_1;
    var Autowhatever;
    function noop() { }
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (section_iterator_1_1) {
                section_iterator_1 = section_iterator_1_1;
            },
            function (react_themeable_1_1) {
                react_themeable_1 = react_themeable_1_1;
            }],
        execute: function() {
            Autowhatever = (function (_super) {
                __extends(Autowhatever, _super);
                function Autowhatever(props) {
                    _super.call(this, props);
                    this.onKeyDown = this.onKeyDown.bind(this);
                }
                Autowhatever.prototype.onKeyDown = function (event) {
                    var _a = this.props, inputProps = _a.inputProps, focusedSectionIndex = _a.focusedSectionIndex, focusedItemIndex = _a.focusedItemIndex;
                    var onKeyDownFn = inputProps.onKeyDown; // Babel is throwing:
                    //   "onKeyDown" is read-only
                    // on:
                    //   const { onKeyDown } = inputProps;
                    switch (event.key) {
                        case 'ArrowDown':
                        case 'ArrowUp':
                            var _b = this.props, multiSection = _b.multiSection, items = _b.items, getSectionItems_1 = _b.getSectionItems;
                            var sectionIterator = section_iterator_1.createSectionIterator({
                                multiSection: multiSection,
                                data: multiSection ?
                                    items.map(function (section) { return getSectionItems_1(section).length; }) :
                                    items.length
                            });
                            var nextPrev = (event.key === 'ArrowDown' ? 'next' : 'prev');
                            var _c = sectionIterator[nextPrev]([focusedSectionIndex, focusedItemIndex]), newFocusedSectionIndex = _c[0], newFocusedItemIndex = _c[1];
                            onKeyDownFn(event, { newFocusedSectionIndex: newFocusedSectionIndex, newFocusedItemIndex: newFocusedItemIndex });
                            break;
                        default:
                            onKeyDownFn(event, { focusedSectionIndex: focusedSectionIndex, focusedItemIndex: focusedItemIndex });
                    }
                };
                Autowhatever.prototype.getItemId = function (sectionIndex, itemIndex) {
                    if (itemIndex === null) {
                        return null;
                    }
                    var id = this.props.id;
                    var section = (sectionIndex === null ? '' : "section-" + sectionIndex);
                    return "react-autowhatever-" + id + "-" + section + "-item-" + itemIndex;
                };
                Autowhatever.prototype.getItemsContainerId = function () {
                    var id = this.props.id;
                    return "react-whatever-" + id;
                };
                Autowhatever.prototype.renderItemsList = function (theme, items, sectionIndex) {
                    var _this = this;
                    var _a = this.props, renderItem = _a.renderItem, focusedSectionIndex = _a.focusedSectionIndex, focusedItemIndex = _a.focusedItemIndex;
                    var isItemPropsFunction = (typeof this.props.itemProps === 'function');
                    return items.map(function (item, itemIndex) {
                        var itemPropsObj = isItemPropsFunction
                            ? _this.props.itemProps({ sectionIndex: sectionIndex, itemIndex: itemIndex })
                            : _this.props.itemProps;
                        var onMouseEnter = itemPropsObj.onMouseEnter, onMouseLeave = itemPropsObj.onMouseLeave, onMouseDown = itemPropsObj.onMouseDown, onClick = itemPropsObj.onClick;
                        var onMouseEnterFn = onMouseEnter ?
                            function (event) { return onMouseEnter(event, { sectionIndex: sectionIndex, itemIndex: itemIndex }); } :
                            noop;
                        var onMouseLeaveFn = onMouseLeave ?
                            function (event) { return onMouseLeave(event, { sectionIndex: sectionIndex, itemIndex: itemIndex }); } :
                            noop;
                        var onMouseDownFn = onMouseDown ?
                            function (event) { return onMouseDown(event, { sectionIndex: sectionIndex, itemIndex: itemIndex }); } :
                            noop;
                        var onClickFn = onClick ?
                            function (event) { return onClick(event, { sectionIndex: sectionIndex, itemIndex: itemIndex }); } :
                            noop;
                        var itemProps = Object.assign({
                            id: _this.getItemId(sectionIndex, itemIndex),
                            role: 'option',
                            onMouseEnter: onMouseEnterFn,
                            onMouseLeave: onMouseLeaveFn,
                            onMouseDown: onMouseDownFn,
                            onClick: onClickFn
                        }, theme(itemIndex, 'item', sectionIndex === focusedSectionIndex &&
                            itemIndex === focusedItemIndex &&
                            'itemFocused'), itemPropsObj);
                        return (React.createElement("li", React.__spread({}, itemProps), renderItem(item)));
                    });
                };
                Autowhatever.prototype.renderSections = function (theme) {
                    var _this = this;
                    var _a = this.props, items = _a.items, getSectionItems = _a.getSectionItems;
                    var sectionItemsArray = items.map(function (section) { return getSectionItems(section); });
                    var noItemsExist = sectionItemsArray.every(function (sectionItems) { return sectionItems.length === 0; });
                    if (noItemsExist) {
                        return null;
                    }
                    var _b = this.props, shouldRenderSection = _b.shouldRenderSection, renderSectionTitle = _b.renderSectionTitle;
                    return (React.createElement("div", React.__spread({id: this.getItemsContainerId(), role: "listbox"}, theme('itemsContainer', 'itemsContainer')), items.map(function (section, sectionIndex) {
                        if (!shouldRenderSection(section)) {
                            return null;
                        }
                        var sectionTitle = renderSectionTitle(section);
                        return (React.createElement("div", React.__spread({key: sectionIndex}, theme(sectionIndex, 'sectionContainer')), sectionTitle &&
                            React.createElement("div", React.__spread({}, theme('sectionTitle', 'sectionTitle')), sectionTitle), React.createElement("ul", React.__spread({}, theme('sectionItemsContainer', 'sectionItemsContainer')), _this.renderItemsList(theme, sectionItemsArray[sectionIndex], sectionIndex))));
                    })));
                };
                Autowhatever.prototype.renderItems = function (theme) {
                    var items = this.props.items;
                    if (items.length === 0) {
                        return null;
                    }
                    return (React.createElement("ul", React.__spread({id: this.getItemsContainerId(), role: "listbox"}, theme('itemsContainer', 'itemsContainer')), this.renderItemsList(theme, items, null)));
                };
                Autowhatever.prototype.render = function () {
                    var _a = this.props, multiSection = _a.multiSection, focusedSectionIndex = _a.focusedSectionIndex, focusedItemIndex = _a.focusedItemIndex;
                    var theme = react_themeable_1.default(this.props.theme);
                    var renderedItems = multiSection ? this.renderSections(theme) : this.renderItems(theme);
                    var isOpen = (renderedItems !== null);
                    var ariaActivedescendant = this.getItemId(focusedSectionIndex, focusedItemIndex);
                    var inputProps = Object.assign({
                        type: 'text',
                        value: '',
                        autoComplete: 'off',
                        role: 'combobox',
                        ref: 'input',
                        'aria-autocomplete': 'list',
                        'aria-owns': this.getItemsContainerId(),
                        'aria-expanded': isOpen,
                        'aria-activedescendant': ariaActivedescendant,
                        onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown
                    }, theme('input', 'input'), this.props.inputProps);
                    return (React.createElement("div", React.__spread({}, theme('container', 'container', isOpen && 'containerOpen')), React.createElement("input", React.__spread({}, inputProps)), renderedItems));
                };
                Autowhatever.defaultProps = {
                    id: '1',
                    multiSection: false,
                    shouldRenderSection: function (o) { return true; },
                    renderItem: function (o) {
                        throw new Error('`renderItem` must be provided');
                    },
                    renderSectionTitle: function (o) {
                        throw new Error('`renderSectionTitle` must be provided');
                    },
                    getSectionItems: function (o) {
                        throw new Error('`getSectionItems` must be provided');
                    },
                    inputProps: {},
                    itemProps: {},
                    focusedSectionIndex: null,
                    focusedItemIndex: null,
                    theme: {
                        container: 'react-autowhatever__container',
                        containerOpen: 'react-autowhatever__container--open',
                        input: 'react-autowhatever__input',
                        itemsContainer: 'react-autowhatever__items-container',
                        item: 'react-autowhatever__item',
                        itemFocused: 'react-autowhatever__item--focused',
                        sectionContainer: 'react-autowhatever__section-container',
                        sectionTitle: 'react-autowhatever__section-title',
                        sectionItemsContainer: 'react-autowhatever__section-items-container'
                    }
                };
                return Autowhatever;
            }(React.Component));
            exports_1("default", Autowhatever);
        }
    }
});
//# sourceMappingURL=AutoWhatever.js.map