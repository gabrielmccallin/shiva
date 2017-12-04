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
import { EventDispatcher } from './EventDispatcher';
import Promise from 'promise-polyfill';
var Loader = (function (_super) {
    __extends(Loader, _super);
    function Loader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Loader.get = function (config) {
        return this.load(config, this.httpMethods.GET);
    };
    Loader.post = function (config) {
        return this.load(config, this.httpMethods.POST);
    };
    Loader.put = function (config) {
        return this.load(config, this.httpMethods.PUT);
    };
    Loader.update = function (config) {
        return this.load(config, this.httpMethods.UPDATE);
    };
    Loader.delete = function (config) {
        return this.load(config, this.httpMethods.DELETE);
    };
    Loader.load = function (config, method) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var http = new XMLHttpRequest();
            if (method === Loader.httpMethods.GET) {
                config.url = config.url + _this.concatParams(config.params);
            }
            http.open(method, config.url, true);
            http.timeout = 20000;
            if (config.headers) {
                config.headers.map(function (header) {
                    http.setRequestHeader(header.value, header.variable);
                });
            }
            http.onload = function () { return _this.handleResponse(http, resolve, reject, config.data); };
            http.onerror = function () { return reject(new Error("Network Error")); };
            http.send(config.params);
        });
    };
    Loader.concatParams = function (params) {
        var queryString = "?";
        for (var i in params) {
            if (params.hasOwnProperty(i)) {
                queryString = queryString.concat(i, "=", encodeURI(params[i]), "&");
            }
        }
        queryString = queryString.slice(0, -1);
        return queryString;
    };
    Loader.handleResponse = function (http, resolve, reject, data) {
        if (http.status === 200) {
            return resolve(http.responseText);
        }
        else {
            var error = void 0;
            if (http.status === 0) {
                error = "Network Error 0x2ee7";
            }
            else {
                error = http.statusText;
            }
            return reject(new Error(error));
        }
    };
    Loader.httpMethods = {
        GET: "GET",
        PUT: "PUT",
        POST: "POST",
        DELETE: "DELETE",
        UPDATE: "UPDATE"
    };
    Loader.COMPLETE = "COMPLETE";
    Loader.ERROR = "ERROR";
    return Loader;
}(EventDispatcher));
export { Loader };
