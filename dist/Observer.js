var Observer = (function () {
    function Observer() {
    }
    Observer.addEventListener = function (scope, type, callback) {
        if (!this.observers[type]) {
            this.observers[type] = [];
        }
        this.observers[type].push({ scope: scope, type: type, callback: callback });
    };
    Observer.removeEventListener = function (type, callback) {
        var indexOfClosureToRemove;
        for (var i = 0; i < this.observers[type].length; i++) {
            if (this.observers[type].callback === callback) {
                indexOfClosureToRemove = i;
                break;
            }
        }
        this.observers[type].splice(indexOfClosureToRemove, 1);
    };
    Observer.dispatchEvent = function (evt) {
        var type = evt.type;
        if (this.observers[type]) {
            for (var i = 0; i < this.observers[type].length; i++) {
                this.observers[type][i].callback.call(this.observers[type][i].scope, evt);
            }
        }
    };
    Observer.observers = {};
    return Observer;
}());
export { Observer };
