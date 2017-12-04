var ObjectUtils = (function () {
    function ObjectUtils() {
    }
    ObjectUtils.merge = function (target, source) {
        if (target === void 0) { target = {}; }
        if (source === void 0) { source = {}; }
        if (Array.isArray(source) && (Object.keys(target).length === 0)) {
            target = [].concat(source);
        }
        else {
            if (typeof target !== 'object' || typeof source !== 'object') {
                target = source;
            }
            else {
                for (var property in source) {
                    if (source.hasOwnProperty(property)) {
                        if (typeof source[property] === 'object') {
                            target[property] = ObjectUtils.merge(target[property], source[property]);
                            continue;
                        }
                        target[property] = source[property];
                    }
                }
                if (source instanceof Date) {
                    target = source;
                }
            }
        }
        return target;
    };
    return ObjectUtils;
}());
export { ObjectUtils };
