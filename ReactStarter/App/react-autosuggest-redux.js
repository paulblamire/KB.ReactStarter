System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var INPUT_FOCUSED, INPUT_BLURRED, INPUT_CHANGED, UPDATE_FOCUSED_SUGGESTION, REVEAL_SUGGESTIONS, CLOSE_SUGGESTIONS;
    function inputFocused(shouldRenderSuggestions) {
        return {
            type: INPUT_FOCUSED,
            shouldRenderSuggestions: shouldRenderSuggestions
        };
    }
    exports_1("inputFocused", inputFocused);
    function inputBlurred() {
        return {
            type: INPUT_BLURRED
        };
    }
    exports_1("inputBlurred", inputBlurred);
    function inputChanged(shouldRenderSuggestions, lastAction) {
        return {
            type: INPUT_CHANGED,
            shouldRenderSuggestions: shouldRenderSuggestions,
            lastAction: lastAction
        };
    }
    exports_1("inputChanged", inputChanged);
    function updateFocusedSuggestion(sectionIndex, suggestionIndex, value) {
        return {
            type: UPDATE_FOCUSED_SUGGESTION,
            sectionIndex: sectionIndex,
            suggestionIndex: suggestionIndex,
            value: value
        };
    }
    exports_1("updateFocusedSuggestion", updateFocusedSuggestion);
    function revealSuggestions() {
        return {
            type: REVEAL_SUGGESTIONS
        };
    }
    exports_1("revealSuggestions", revealSuggestions);
    function closeSuggestions(lastAction) {
        return {
            type: CLOSE_SUGGESTIONS,
            lastAction: lastAction
        };
    }
    exports_1("closeSuggestions", closeSuggestions);
    function reducer(state, action) {
        switch (action.type) {
            case INPUT_FOCUSED:
                return Object.assign({}, state, {
                    isFocused: true,
                    isCollapsed: !action.shouldRenderSuggestions
                });
            case INPUT_BLURRED:
                return Object.assign({}, state, {
                    isFocused: false,
                    focusedSectionIndex: null,
                    focusedSuggestionIndex: null,
                    valueBeforeUpDown: null,
                    isCollapsed: true
                });
            case INPUT_CHANGED:
                return Object.assign({}, state, {
                    focusedSectionIndex: null,
                    focusedSuggestionIndex: null,
                    valueBeforeUpDown: null,
                    isCollapsed: !action.shouldRenderSuggestions,
                    lastAction: action.lastAction
                });
            case UPDATE_FOCUSED_SUGGESTION: {
                var value = action.value, sectionIndex = action.sectionIndex, suggestionIndex = action.suggestionIndex;
                var valueBeforeUpDown = state.valueBeforeUpDown === null && typeof value !== 'undefined'
                    ? value
                    : state.valueBeforeUpDown;
                return Object.assign({}, state, {
                    focusedSectionIndex: sectionIndex,
                    focusedSuggestionIndex: suggestionIndex,
                    valueBeforeUpDown: valueBeforeUpDown
                });
            }
            case REVEAL_SUGGESTIONS:
                return Object.assign({}, state, {
                    isCollapsed: false
                });
            case CLOSE_SUGGESTIONS:
                return Object.assign({}, state, {
                    focusedSectionIndex: null,
                    focusedSuggestionIndex: null,
                    valueBeforeUpDown: null,
                    isCollapsed: true,
                    lastAction: action.lastAction
                });
            default:
                return state;
        }
    }
    exports_1("default", reducer);
    return {
        setters:[],
        execute: function() {
            INPUT_FOCUSED = 'INPUT_FOCUSED';
            INPUT_BLURRED = 'INPUT_BLURRED';
            INPUT_CHANGED = 'INPUT_CHANGED';
            UPDATE_FOCUSED_SUGGESTION = 'UPDATE_FOCUSED_SUGGESTION';
            REVEAL_SUGGESTIONS = 'REVEAL_SUGGESTIONS';
            CLOSE_SUGGESTIONS = 'CLOSE_SUGGESTIONS';
        }
    }
});
//# sourceMappingURL=react-autosuggest-redux.js.map