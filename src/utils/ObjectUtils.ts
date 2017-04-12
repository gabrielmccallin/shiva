﻿module shiva {
    export class ObjectUtils {
        static merge(target, source) {
            /* Merges two (or more) objects,
               giving the last one precedence */
            if (typeof target !== 'object') {
                target = {};
            }

            for (var property in source) {
                if (source.hasOwnProperty(property)) {
                    var sourceProperty = source[property];
                    if (typeof sourceProperty === 'object') {
                        target[property] = ObjectUtils.merge(target[property], sourceProperty);
                        continue;
                    }
                    target[property] = sourceProperty;
                }
            }
            return target;
        }
    }
}