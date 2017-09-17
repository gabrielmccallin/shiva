export class ObjectUtils {
    /**
     * Merges two objects recursive, source overwrites target if matching properties
     * @param {Object} target Object to be merged onto
     * @param {Object} source Object to be merged from
     * @return {Object} Will be an object containing all properties recursive from target and source
     */
    static merge(target: any, source: any): any {
        if (typeof target !== 'object') {
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
            if (!source.hasOwnProperty(property)) {
                target = source;
            }
        }
        return target;
    }
}