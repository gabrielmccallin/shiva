var Event = (function () {
    function Event(type, targetObj, data, sourceEvent) {
        this._type = type;
        this._target = targetObj;
        this._sourceEvent = sourceEvent;
        this._data = data;
    }
    Object.defineProperty(Event.prototype, "target", {
        get: function () {
            return this._target;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (payload) {
            this._data = payload;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "sourceEvent", {
        get: function () {
            return this._sourceEvent;
        },
        enumerable: true,
        configurable: true
    });
    return Event;
}());
export { Event };
var EventDispatcher = (function () {
    function EventDispatcher() {
        this._listeners = [];
    }
    EventDispatcher.prototype.hasEventListener = function (type, listener) {
        var exists = false;
        for (var i = 0; i < this._listeners.length; i++) {
            if (this._listeners[i].type === type && this._listeners[i].listener === listener) {
                exists = true;
            }
        }
        return exists;
    };
    EventDispatcher.prototype.addEventListener = function (scope, typeStr, listenerFunc, data, useCapture, scopedEventListener) {
        if (useCapture === void 0) { useCapture = false; }
        if (scopedEventListener === void 0) { scopedEventListener = undefined; }
        if (this.hasEventListener(typeStr, listenerFunc)) {
            return;
        }
        this._listeners.push({
            scope: scope,
            type: typeStr,
            listener: listenerFunc,
            useCapture: useCapture,
            scopedEventListener: scopedEventListener,
            data: data
        });
    };
    EventDispatcher.prototype.removeEventListener = function (typeStr, listenerFunc) {
        var listener = this._listeners.filter(function (item) {
            return (item.type === typeStr && item.listener.toString() === listenerFunc.toString());
        });
        this._listeners = this._listeners.filter(function (item) {
            return (!(item.type === typeStr && item.listener.toString() === listenerFunc.toString()));
        });
        return listener[0];
    };
    EventDispatcher.prototype.dispatchEvent = function (evt) {
        for (var i = 0; i < this._listeners.length; i++) {
            if (this._listeners[i].type === evt.type) {
                if (this._listeners[i].data) {
                    evt.data = this._listeners[i].data;
                }
                this._listeners[i].listener.call(this._listeners[i].scope, evt);
            }
        }
    };
    return EventDispatcher;
}());
export { EventDispatcher };
