var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Event } from './EventDispatcher';
var LoaderEvent = (function (_super) {
    __extends(LoaderEvent, _super);
    function LoaderEvent(type, targetObj, response, status, httpMetaData, data, sourceEvent) {
        var _this = _super.call(this, type, targetObj, data, sourceEvent) || this;
        _this._response = response;
        _this._status = status;
        _this._httpMetaData = httpMetaData;
        return _this;
    }
    Object.defineProperty(LoaderEvent.prototype, "response", {
        get: function () {
            return this._response;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderEvent.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderEvent.prototype, "httpMetaData", {
        get: function () {
            return this._httpMetaData;
        },
        enumerable: true,
        configurable: true
    });
    return LoaderEvent;
}(Event));
export { LoaderEvent };
