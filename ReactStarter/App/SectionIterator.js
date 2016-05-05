System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function createSectionIterator(params) {
        var data = params.data, multiSection = params.multiSection;
        function nextNonEmptySectionIndex(sectionIndex) {
            var sectionData = data;
            if (sectionIndex === null) {
                sectionIndex = 0;
            }
            else {
                sectionIndex++;
            }
            while (sectionIndex < sectionData.length && sectionData[sectionIndex] === 0) {
                sectionIndex++;
            }
            return sectionIndex === sectionData.length ? null : sectionIndex;
        }
        function prevNonEmptySectionIndex(sectionIndex) {
            var sectionData = data;
            if (sectionIndex === null) {
                sectionIndex = sectionData.length - 1;
            }
            else {
                sectionIndex--;
            }
            while (sectionIndex >= 0 && sectionData[sectionIndex] === 0) {
                sectionIndex--;
            }
            return sectionIndex === -1 ? null : sectionIndex;
        }
        function next(position) {
            var sectionIndex = position[0], itemIndex = position[1];
            if (multiSection) {
                if (itemIndex === null || itemIndex === data[sectionIndex] - 1) {
                    sectionIndex = nextNonEmptySectionIndex(sectionIndex);
                    if (sectionIndex === null) {
                        return [null, null];
                    }
                    return [sectionIndex, 0];
                }
                return [sectionIndex, itemIndex + 1];
            }
            if (data === 0 || itemIndex === data - 1) {
                return [null, null];
            }
            if (itemIndex === null) {
                return [null, 0];
            }
            return [null, itemIndex + 1];
        }
        function prev(position) {
            var sectionIndex = position[0], itemIndex = position[1];
            if (multiSection) {
                if (itemIndex === null || itemIndex === 0) {
                    sectionIndex = prevNonEmptySectionIndex(sectionIndex);
                    if (sectionIndex === null) {
                        return [null, null];
                    }
                    return [sectionIndex, data[sectionIndex] - 1];
                }
                return [sectionIndex, itemIndex - 1];
            }
            if (data === 0 || itemIndex === 0) {
                return [null, null];
            }
            if (itemIndex === null) {
                return [null, data - 1];
            }
            return [null, itemIndex - 1];
        }
        function isLast(position) {
            return next(position)[1] === null;
        }
        return {
            next: next,
            prev: prev,
            isLast: isLast
        };
    }
    exports_1("createSectionIterator", createSectionIterator);
    return {
        setters:[],
        execute: function() {
            ;
        }
    }
});
//# sourceMappingURL=SectionIterator.js.map