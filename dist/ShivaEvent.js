var ShivaEvent = (function () {
    function ShivaEvent(type, targetObj, data, sourceEvent) {
        this._type = type;
        this._target = targetObj;
        this._sourceEvent = sourceEvent;
        this._data = data;
    }
    Object.defineProperty(ShivaEvent.prototype, "target", {
        get: function () {
            return this._target;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShivaEvent.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShivaEvent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (payload) {
            this._data = payload;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShivaEvent.prototype, "sourceEvent", {
        get: function () {
            return this._sourceEvent;
        },
        enumerable: true,
        configurable: true
    });
    return ShivaEvent;
}());
export { ShivaEvent };
