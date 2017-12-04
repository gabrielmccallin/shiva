'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var promise = createCommonjsModule(function (module) {
(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function() {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    var args = Array.prototype.slice.call(arr);

    return new Promise(function (resolve, reject) {
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if ('object' !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(commonjsGlobal);
});

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Dimensions = (function () {
    function Dimensions(width, height) {
        this.width = width;
        this.height = height;
    }
    return Dimensions;
}());

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

var Properties = (function () {
    function Properties() {
    }
    Properties.style = function (object, vars) {
        var element;
        if (object.element) {
            element = object.element;
        }
        else {
            element = object;
        }
        for (var i in vars) {
            if (vars.hasOwnProperty(i)) {
                var value = vars[i];
                if (typeof (value) === "number") {
                    if (value) {
                        switch (i) {
                            case "x":
                                value = vars[i].toString();
                                value += "px";
                                break;
                            case "y":
                                value = vars[i].toString();
                                value += "px";
                                break;
                            case "height":
                                value = vars[i].toString();
                                value += "px";
                                break;
                            case "width":
                                value = vars[i].toString();
                                value += "px";
                                break;
                            default:
                                break;
                        }
                    }
                }
                var styleName = i;
                switch (i) {
                    case "x":
                        styleName = "left";
                        break;
                    case "y":
                        styleName = "top";
                        break;
                    case "alpha":
                        styleName = "opacity";
                        break;
                    default:
                        break;
                }
                element.style[styleName] = value;
            }
        }
    };
    return Properties;
}());

var Window = (function () {
    function Window() {
    }
    Window.scrollY = function () {
        var scrollTop = document.body.scrollTop;
        if (scrollTop == 0) {
            if (window.pageYOffset) {
                scrollTop = window.pageYOffset;
            }
            else {
                scrollTop = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
            }
        }
        return scrollTop;
    };
    Window.scrollX = function () {
        var scrollLeft = document.body.scrollLeft;
        if (scrollLeft == 0) {
            if (window.pageXOffset) {
                scrollLeft = window.pageXOffset;
            }
            else {
                scrollLeft = (document.body.parentElement) ? document.body.parentElement.scrollLeft : 0;
            }
        }
        return scrollLeft;
    };
    Object.defineProperty(Window, "height", {
        get: function () {
            return window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window, "width", {
        get: function () {
            return window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    return Window;
}());

var Container = (function (_super) {
    __extends(Container, _super);
    function Container(config) {
        var _this = _super.call(this) || this;
        _this.transitions = {};
        _this.timeoutsArray = [];
        if (config) {
            if (config.root && (!document.getElementById("app"))) {
                _this._element = document.createElement("div");
                _this._element.style.position = "absolute";
                _this._element.style.height = "100%";
                _this._element.style.width = "100%";
                _this._element.style.top = "0px";
                _this._element.style.left = "0px";
                _this._element.style.margin = "0px";
                _this._element.id = "app";
                document.body.appendChild(_this._element);
            }
            else {
                if (config.type) {
                    _this._element = document.createElement(config.type);
                }
                else {
                    _this._element = document.createElement("div");
                }
            }
            if (config.id) {
                _this._element.id = config.id;
            }
            if (config.text) {
                _this.innerHtml = config.text;
            }
            for (var key in config.attributes) {
                _this._element.setAttribute(key, config.attributes[key]);
            }
            _this._data = config.data;
            if (config.styles) {
                config.styles.forEach(function (style) {
                    Properties.style(_this._element, style);
                });
            }
            Properties.style(_this._element, config.style);
            if (config.className) {
                if (typeof config.className === 'string') {
                    _this.className(config.className);
                }
                else {
                    _this.className.apply(_this, config.className);
                }
            }
            Properties.style(_this._element, config);
            if (config.responsive) {
                _this.responsive(config.responsive);
            }
        }
        else {
            _this._element = document.createElement("div");
        }
        return _this;
    }
    Object.defineProperty(Container.prototype, "timeouts", {
        get: function () {
            return this.timeoutsArray;
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.killAnimations = function () {
        this.timeoutsArray.forEach(function (timeout) {
            clearTimeout(timeout);
        });
        this.timeoutsArray = [];
    };
    Container.prototype.addToBody = function () {
        document.body.appendChild(this._element);
    };
    Container.prototype.style = function (vars) {
        Properties.style(this._element, vars);
    };
    Container.prototype.className = function () {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        var className = names.reduce(function (acc, val) {
            return acc + " " + val;
        });
        if (!this._element.className) {
            this._element.className = className;
        }
        else {
            this._element.className = this._element.className + " " + className;
        }
    };
    Container.prototype.appendChild = function (child) {
        var childElement;
        if (child.element) {
            childElement = child.element;
        }
        this._element.appendChild(childElement);
    };
    Container.prototype.addChild = function (child) {
        this.appendChild(child);
    };
    Container.prototype.removeChild = function (child) {
        if (this._element === child.element.parentNode) {
            this._element.removeChild(child.element);
        }
    };
    Container.prototype.to = function (config) {
        var _this = this;
        var delay = 10;
        if (config.delay) {
            delay = config.delay * 1000;
        }
        this.timeoutsArray.push(setTimeout(function () {
            for (var i in config.toVars) {
                var vo = {};
                if (config.duration >= 0) {
                    vo["duration"] = config.duration;
                }
                if (_this.transitions[i]) {
                    vo["count"] = _this.transitions[i].count + 1;
                }
                else {
                    vo["count"] = 0;
                }
                _this.transitions[i] = vo;
            }
            Properties.style(_this._element, {
                transition: _this.convertTransitionObjectToString(_this.transitions)
            });
            if (config.ease) {
                Properties.style(_this._element, {
                    transitionTimingFunction: config.ease.toString()
                });
            }
            Properties.style(_this._element, config.toVars);
        }, delay));
        if (config.resolve) {
            this.timeoutsArray.push(setTimeout(function () {
                Properties.style(_this._element, {
                    transition: _this.removeCompletedTransitionsAndReapply(config.toVars)
                });
                _this.dispatchEvent(new Event("TRANSITION_COMPLETE", _this));
                config.resolve(_this);
            }, (config.duration * 1000) + delay));
            return null;
        }
        else {
            return new promise(function (resolve, reject) {
                _this.timeoutsArray.push(setTimeout(function () {
                    Properties.style(_this._element, {
                        transition: _this.removeCompletedTransitionsAndReapply(config.toVars)
                    });
                    resolve(_this);
                    _this.dispatchEvent(new Event("TRANSITION_COMPLETE", _this));
                }, (config.duration * 1000) + delay));
            });
        }
    };
    Container.prototype.convertTransitionStyleToObject = function (style) {
        var _this = this;
        if (style.transitionProperty) {
            var transitionProps = style.transitionProperty.split(",");
            var transitionDuration_1 = style.transitionDuration.split(",");
            var transitionDelay_1 = style.transitionDelay.split(",");
            var transitionObject_1 = {};
            var count_1 = 0;
            transitionProps.map(function (prop) {
                var propNoSpace = prop.replace(/^\s/g, "");
                propNoSpace = _this.hyphenToCamel(propNoSpace);
                var vo = {};
                var duration = transitionDuration_1[count_1].replace(/^\s/g, "");
                if (transitionDuration_1[count_1]) {
                    vo["duration"] = transitionDuration_1[count_1].replace(/^\s/g, "").replace("s", "");
                }
                if (transitionDelay_1[count_1]) {
                    var trimTransitionDelayValue = transitionDelay_1[count_1].replace(/^\s/g, "").replace("s", "");
                    if (trimTransitionDelayValue !== ("initial" || "inherit")) {
                        vo["delay"] = trimTransitionDelayValue;
                    }
                }
                transitionObject_1[propNoSpace] = vo;
                count_1++;
            });
            return transitionObject_1;
        }
        else {
            return {};
        }
    };
    Container.prototype.convertTransitionObjectToString = function (transition) {
        var transitionString = "";
        for (var i in transition) {
            if (transitionString !== "") {
                transitionString += ", ";
            }
            var hyphenCaseIndex = this.camelToHyphen(i);
            transitionString += hyphenCaseIndex + " " + transition[i]["duration"] + "s";
            if (transition[i]["delay"]) {
                transitionString += " " + transition[i]["delay"] + "s";
            }
        }
        return transitionString;
    };
    Container.prototype.removeCompletedTransitionsAndReapply = function (toVars) {
        for (var i in toVars) {
            if (this.transitions[i]) {
                if (this.transitions[i].count > 0) {
                    this.transitions[i].count--;
                }
                else {
                    delete this.transitions[i];
                }
            }
        }
        return this.convertTransitionObjectToString(this.transitions);
    };
    Container.prototype.fromTo = function (config) {
        var _this = this;
        if (config.delay) {
            config.delay = config.delay * 1000;
            if (config.immediateRender) {
                Properties.style(this._element, config.fromVars);
            }
        }
        else {
            Properties.style(this._element, config.fromVars);
            config.delay = 10;
        }
        return new promise(function (resolve, reject) {
            _this.timeoutsArray.push(setTimeout(function () {
                Properties.style(_this._element, config.fromVars);
                _this.timeoutsArray.push(setTimeout(function () {
                    _this.to({
                        duration: config.duration,
                        ease: config.ease,
                        toVars: config.toVars,
                        resolve: resolve
                    });
                }, 10));
            }, config.delay));
        });
    };
    Container.prototype.camelToHyphen = function (camel) {
        return camel.replace(/[a-z][A-Z]/g, function (match, index) {
            var matchArray = match.split("");
            matchArray[2] = matchArray[1];
            matchArray[1] = "-";
            matchArray[2] = matchArray[2].toLowerCase();
            var result = "";
            matchArray.map(function (char) {
                result += char;
            });
            return result;
        });
    };
    Container.prototype.hyphenToCamel = function (hyphen) {
        return hyphen.replace(/-([a-z])/g, function (match, index) {
            return match[1].toUpperCase();
        });
    };
    Container.prototype.addEventListener = function (scope, typeStr, listenerFunc, data, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        var that = this;
        var scopedEventListener = function (e) {
            listenerFunc.apply(scope, [new Event(typeStr, that, data, e)]);
        };
        _super.prototype.addEventListener.call(this, scope, typeStr, listenerFunc, data, useCapture, scopedEventListener);
        if (this._element.addEventListener) {
            this._element.addEventListener(typeStr, scopedEventListener, useCapture);
        }
        else if (this._element["attachEvent"]) {
            this._element["attachEvent"]('on' + typeStr, scopedEventListener);
            this._element["attachEvent"]("onpropertychange", function (e) {
                if (e.eventType === typeStr) {
                    e.cancelBubble = true;
                    e.returnValue = false;
                    e.data = e.customData;
                    scopedEventListener(e);
                }
            });
        }
    };
    Container.prototype.removeEventListener = function (typeStr, listenerFunc) {
        var listener = _super.prototype.removeEventListener.call(this, typeStr, listenerFunc);
        if (listener) {
            if (this._element.removeEventListener) {
                this._element.removeEventListener(typeStr, listener.scopedEventListener, listener.useCapture);
            }
            else if (this._element["detachEvent"]) {
                this._element["detachEvent"]('on' + typeStr, listenerFunc);
            }
        }
        return listener;
    };
    Container.prototype.preventDefault = function (e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    };
    Container.prototype.responsive = function (config) {
        this.responsiveRules = config;
        this.addResizeListener();
        this.resizeHandler(null);
    };
    Container.prototype.addResizeListener = function () {
        var _this = this;
        window.addEventListener("resize", function (event) {
            _this.resizeHandler(event);
        });
    };
    Container.prototype.resizeHandler = function (e) {
        var width = Window.width;
        var mergedRules = {};
        var duration = 0;
        if (Array.isArray(this.responsiveRules)) {
            var rulesArray = this.responsiveRules;
            for (var index = 0; index < rulesArray.length; index++) {
                var rule = rulesArray[index];
                if (rule.duration) {
                    duration = rule.duration;
                }
                mergedRules = this.calculateResponsiveStyles(width, rule, mergedRules);
            }
        }
        else {
            var rule = this.responsiveRules;
            if (rule.duration) {
                duration = rule.duration;
            }
            mergedRules = this.calculateResponsiveStyles(width, rule);
        }
        if (duration === 0) {
            Properties.style(this._element, mergedRules);
        }
        else {
            this.to({
                duration: duration,
                toVars: mergedRules
            });
        }
    };
    Container.prototype.calculateResponsiveStyles = function (width, rule, mergedRules) {
        if (mergedRules === void 0) { mergedRules = {}; }
        if (rule.maxWidth && rule.maxWidth !== 0) {
            if (width <= rule.maxWidth) {
                if (rule.minWidth || rule.minWidth === 0) {
                    if (width > rule.minWidth) {
                        mergedRules = ObjectUtils.merge(mergedRules, rule.style);
                    }
                }
                else {
                    mergedRules = ObjectUtils.merge(mergedRules, rule.style);
                }
            }
        }
        else {
            if (rule.minWidth || rule.minWidth === 0) {
                if (width > rule.minWidth) {
                    mergedRules = ObjectUtils.merge(mergedRules, rule.style);
                }
            }
        }
        return mergedRules;
    };
    Object.defineProperty(Container.prototype, "width", {
        get: function () {
            return this.shadow().width;
        },
        set: function (w) {
            Properties.style(this._element, { width: w });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "height", {
        get: function () {
            return this.shadow().height;
        },
        set: function (h) {
            Properties.style(this._element, { height: h });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "y", {
        get: function () {
            return this._element.offsetTop;
        },
        set: function (yPos) {
            Properties.style(this._element, { y: yPos });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "x", {
        get: function () {
            return this._element.offsetLeft;
        },
        set: function (xPos) {
            Properties.style(this._element, { x: xPos });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "alpha", {
        get: function () {
            return parseFloat(this._element.style.opacity);
        },
        set: function (value) {
            Properties.style(this._element, { opacity: value.toString() });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (_data) {
            this._data = _data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "innerText", {
        get: function () {
            return this._element.innerText;
        },
        set: function (text) {
            this._element.innerText = text;
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.hide = function () {
        Properties.style(this._element, { display: "none" });
    };
    Container.prototype.show = function () {
        Properties.style(this._element, { display: "block" });
    };
    Container.prototype.fillContainer = function () {
        Properties.style(this._element, {
            minWidth: "100%",
            minHeight: "100%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            position: "relative"
        });
    };
    Container.prototype.centreHorizontal = function () {
        Properties.style(this._element, {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative"
        });
    };
    Container.prototype.centreHorizontalText = function () {
        Properties.style(this._element, {
            textAlign: "center"
        });
    };
    Container.prototype.shadow = function () {
        if (!document.body.contains(this._element)) {
            var parent = this._element.parentElement;
            document.body.appendChild(this._element);
            var dimensions = this.dimensionsPolyfill();
            document.body.removeChild(this._element);
            if (parent) {
                parent.appendChild(this._element);
            }
            else {
                document.body.removeChild(this._element);
            }
            return dimensions;
        }
        else {
            return this.dimensionsPolyfill();
        }
    };
    Container.prototype.dimensionsPolyfill = function () {
        var height = this._element.getBoundingClientRect().height;
        var width = this._element.getBoundingClientRect().width;
        if (width && height) {
        }
        else {
            width = this._element.scrollWidth;
            height = this._element.scrollHeight;
        }
        var dimensions = new Dimensions(width, height);
        return dimensions;
    };
    Object.defineProperty(Container.prototype, "value", {
        get: function () {
            var inputElement = this._element;
            return inputElement.value;
        },
        set: function (_value) {
            var inputElement = this._element;
            inputElement.value = _value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "id", {
        get: function () {
            return this._element.id;
        },
        set: function (identifier) {
            this._element.id = identifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "innerHtml", {
        get: function () {
            return this._element.innerHTML;
        },
        set: function (html) {
            this._element.innerHTML = html;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "href", {
        get: function () {
            var element = this._element;
            return element.href;
        },
        set: function (link) {
            var element = this._element;
            element.href = link;
        },
        enumerable: true,
        configurable: true
    });
    Container.TRANSITION_COMPLETE = "TRANSITION_COMPLETE";
    return Container;
}(EventDispatcher));

var Anchor = (function (_super) {
    __extends(Anchor, _super);
    function Anchor(config) {
        var _this = this;
        config.type = "a";
        _this = _super.call(this, config) || this;
        var element = _this.element;
        element.href = config.href;
        return _this;
    }
    return Anchor;
}(Container));

var Styles = (function () {
    function Styles() {
    }
    Styles.button = {
        whiteSpace: "nowrap",
        msTouchAction: "manipulation",
        touchAction: "manipulation",
        cursor: "pointer",
        webkitUserSelect: "none",
        mozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        text: "Button",
        icon: {
            padding: "0.75rem"
        },
        type: "button",
        attributes: {
            type: "button"
        }
    };
    Styles.drop = {
        fontFamily: "sans-serif",
        fontSize: "1.2rem",
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: "1rem",
        durationExpand: 0.5,
        durationContract: 0.5,
        border: "2px solid transparent",
        borderColor: "#eeeeee",
        dropGap: "0.1rem",
        hover: {
            backgroundColor: "#dddddd",
            color: "#000000",
            durationIn: 0,
            durationOut: 0.5,
        },
        caret: {
            width: "0px",
            height: "0px",
            borderLeftWidth: "0.35rem",
            borderLeftStyle: "solid",
            borderLeftColor: "transparent",
            borderRightWidth: "0.35rem",
            borderRightStyle: "solid",
            borderRightColor: "transparent",
            borderTopWidth: "0.35rem",
            borderTopStyle: "solid",
            borderTopColor: "black",
            display: "inline-block",
            verticalAlign: "middle",
            marginLeft: "0.35rem",
            pointerEvents: "none",
            transform: "translateY(-0.1rem)"
        }
    };
    return Styles;
}());

var Button = (function (_super) {
    __extends(Button, _super);
    function Button(config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        config = ObjectUtils.merge(ObjectUtils.merge({}, Styles.button), config);
        _this = _super.call(this, config) || this;
        _this.stateOver = false;
        _this.enabled = true;
        _this.styles = Styles.button;
        if (config) {
            _this.styles = config;
            if (config.styles) {
                config.styles.map(function (style) {
                    ObjectUtils.merge(_this.styles, style);
                });
            }
            if (config.style) {
                ObjectUtils.merge(_this.styles, config.style);
            }
        }
        _this.addEventListener(_this, "mouseover", _this.over);
        _this.addEventListener(_this, "mouseout", _this.out);
        return _this;
    }
    Button.prototype.over = function () {
        if (this.styles.hover) {
            if (this.enabled) {
                this.stateOver = true;
                this.to({
                    duration: this.styles.hover.durationIn,
                    toVars: {
                        backgroundColor: this.styles.hover.backgroundColor,
                        color: this.styles.hover.color
                    }
                });
            }
        }
    };
    Button.prototype.out = function () {
        if (this.styles.hover) {
            if (this.enabled) {
                this.stateOver = false;
                this.to({
                    duration: this.styles.hover.durationOut,
                    toVars: {
                        backgroundColor: this.styles.backgroundColor,
                        color: this.styles.color
                    }
                });
            }
        }
    };
    Button.prototype.click = function () {
        if (this.enabled) {
            var event = new Event(Button.CLICK, this);
            this.dispatchEvent(event);
        }
    };
    Button.prototype.disable = function () {
        this.enabled = false;
        this.style({ cursor: "default" });
        this.element.setAttribute("disabled", "true");
    };
    Button.prototype.select = function () {
        this.enabled = false;
        this.style({ cursor: "default" });
    };
    Button.prototype.enable = function () {
        this.enabled = true;
        this.style({ cursor: "pointer" });
        this.element.removeAttribute("disabled");
    };
    Button.prototype.style = function (style) {
        ObjectUtils.merge(this.styles, style);
        _super.prototype.style.call(this, style);
    };
    Button.CLICK = "click";
    return Button;
}(Container));

var CheckBox = (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox(config) {
        var _this = _super.call(this, {
            type: "input"
        }) || this;
        var element = _this.element;
        element.type = "checkbox";
        if (config) {
            if (config.id) {
                _this.id = config.id;
            }
            _this.style(config.style);
            _this.style(config);
            element.checked = config.checked;
        }
        return _this;
    }
    Object.defineProperty(CheckBox.prototype, "checked", {
        get: function () {
            var element = this.element;
            return element.checked;
        },
        enumerable: true,
        configurable: true
    });
    CheckBox.CLICK = "click";
    return CheckBox;
}(Container));

var Container$1 = (function (_super) {
    __extends(Container, _super);
    function Container(config) {
        var _this = _super.call(this) || this;
        _this.transitions = {};
        _this.timeoutsArray = [];
        if (config) {
            if (config.root && (!document.getElementById("app"))) {
                _this._element = document.createElement("div");
                _this._element.style.position = "absolute";
                _this._element.style.height = "100%";
                _this._element.style.width = "100%";
                _this._element.style.top = "0px";
                _this._element.style.left = "0px";
                _this._element.style.margin = "0px";
                _this._element.id = "app";
                document.body.appendChild(_this._element);
            }
            else {
                if (config.type) {
                    _this._element = document.createElement(config.type);
                }
                else {
                    _this._element = document.createElement("div");
                }
            }
            if (config.id) {
                _this._element.id = config.id;
            }
            if (config.text) {
                _this.innerHtml = config.text;
            }
            for (var key in config.attributes) {
                _this._element.setAttribute(key, config.attributes[key]);
            }
            _this._data = config.data;
            if (config.styles) {
                config.styles.forEach(function (style) {
                    Properties.style(_this._element, style);
                });
            }
            Properties.style(_this._element, config.style);
            if (config.className) {
                if (typeof config.className === 'string') {
                    _this.className(config.className);
                }
                else {
                    _this.className.apply(_this, config.className);
                }
            }
            Properties.style(_this._element, config);
            if (config.responsive) {
                _this.responsive(config.responsive);
            }
        }
        else {
            _this._element = document.createElement("div");
        }
        return _this;
    }
    Object.defineProperty(Container.prototype, "timeouts", {
        get: function () {
            return this.timeoutsArray;
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.killAnimations = function () {
        this.timeoutsArray.forEach(function (timeout) {
            clearTimeout(timeout);
        });
        this.timeoutsArray = [];
    };
    Container.prototype.addToBody = function () {
        document.body.appendChild(this._element);
    };
    Container.prototype.style = function (vars) {
        Properties.style(this._element, vars);
    };
    Container.prototype.className = function () {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        var className = names.reduce(function (acc, val) {
            return acc + " " + val;
        });
        if (!this._element.className) {
            this._element.className = className;
        }
        else {
            this._element.className = this._element.className + " " + className;
        }
    };
    Container.prototype.appendChild = function (child) {
        var childElement;
        if (child.element) {
            childElement = child.element;
        }
        this._element.appendChild(childElement);
    };
    Container.prototype.addChild = function (child) {
        this.appendChild(child);
    };
    Container.prototype.removeChild = function (child) {
        if (this._element === child.element.parentNode) {
            this._element.removeChild(child.element);
        }
    };
    Container.prototype.to = function (config) {
        var _this = this;
        var delay = 10;
        if (config.delay) {
            delay = config.delay * 1000;
        }
        this.timeoutsArray.push(setTimeout(function () {
            for (var i in config.toVars) {
                var vo = {};
                if (config.duration >= 0) {
                    vo["duration"] = config.duration;
                }
                if (_this.transitions[i]) {
                    vo["count"] = _this.transitions[i].count + 1;
                }
                else {
                    vo["count"] = 0;
                }
                _this.transitions[i] = vo;
            }
            Properties.style(_this._element, {
                transition: _this.convertTransitionObjectToString(_this.transitions)
            });
            if (config.ease) {
                Properties.style(_this._element, {
                    transitionTimingFunction: config.ease.toString()
                });
            }
            Properties.style(_this._element, config.toVars);
        }, delay));
        if (config.resolve) {
            this.timeoutsArray.push(setTimeout(function () {
                Properties.style(_this._element, {
                    transition: _this.removeCompletedTransitionsAndReapply(config.toVars)
                });
                _this.dispatchEvent(new Event("TRANSITION_COMPLETE", _this));
                config.resolve(_this);
            }, (config.duration * 1000) + delay));
            return null;
        }
        else {
            return new promise(function (resolve, reject) {
                _this.timeoutsArray.push(setTimeout(function () {
                    Properties.style(_this._element, {
                        transition: _this.removeCompletedTransitionsAndReapply(config.toVars)
                    });
                    resolve(_this);
                    _this.dispatchEvent(new Event("TRANSITION_COMPLETE", _this));
                }, (config.duration * 1000) + delay));
            });
        }
    };
    Container.prototype.convertTransitionStyleToObject = function (style) {
        var _this = this;
        if (style.transitionProperty) {
            var transitionProps = style.transitionProperty.split(",");
            var transitionDuration_1 = style.transitionDuration.split(",");
            var transitionDelay_1 = style.transitionDelay.split(",");
            var transitionObject_1 = {};
            var count_1 = 0;
            transitionProps.map(function (prop) {
                var propNoSpace = prop.replace(/^\s/g, "");
                propNoSpace = _this.hyphenToCamel(propNoSpace);
                var vo = {};
                var duration = transitionDuration_1[count_1].replace(/^\s/g, "");
                if (transitionDuration_1[count_1]) {
                    vo["duration"] = transitionDuration_1[count_1].replace(/^\s/g, "").replace("s", "");
                }
                if (transitionDelay_1[count_1]) {
                    var trimTransitionDelayValue = transitionDelay_1[count_1].replace(/^\s/g, "").replace("s", "");
                    if (trimTransitionDelayValue !== ("initial" || "inherit")) {
                        vo["delay"] = trimTransitionDelayValue;
                    }
                }
                transitionObject_1[propNoSpace] = vo;
                count_1++;
            });
            return transitionObject_1;
        }
        else {
            return {};
        }
    };
    Container.prototype.convertTransitionObjectToString = function (transition) {
        var transitionString = "";
        for (var i in transition) {
            if (transitionString !== "") {
                transitionString += ", ";
            }
            var hyphenCaseIndex = this.camelToHyphen(i);
            transitionString += hyphenCaseIndex + " " + transition[i]["duration"] + "s";
            if (transition[i]["delay"]) {
                transitionString += " " + transition[i]["delay"] + "s";
            }
        }
        return transitionString;
    };
    Container.prototype.removeCompletedTransitionsAndReapply = function (toVars) {
        for (var i in toVars) {
            if (this.transitions[i]) {
                if (this.transitions[i].count > 0) {
                    this.transitions[i].count--;
                }
                else {
                    delete this.transitions[i];
                }
            }
        }
        return this.convertTransitionObjectToString(this.transitions);
    };
    Container.prototype.fromTo = function (config) {
        var _this = this;
        if (config.delay) {
            config.delay = config.delay * 1000;
            if (config.immediateRender) {
                Properties.style(this._element, config.fromVars);
            }
        }
        else {
            Properties.style(this._element, config.fromVars);
            config.delay = 10;
        }
        return new promise(function (resolve, reject) {
            _this.timeoutsArray.push(setTimeout(function () {
                Properties.style(_this._element, config.fromVars);
                _this.timeoutsArray.push(setTimeout(function () {
                    _this.to({
                        duration: config.duration,
                        ease: config.ease,
                        toVars: config.toVars,
                        resolve: resolve
                    });
                }, 10));
            }, config.delay));
        });
    };
    Container.prototype.camelToHyphen = function (camel) {
        return camel.replace(/[a-z][A-Z]/g, function (match, index) {
            var matchArray = match.split("");
            matchArray[2] = matchArray[1];
            matchArray[1] = "-";
            matchArray[2] = matchArray[2].toLowerCase();
            var result = "";
            matchArray.map(function (char) {
                result += char;
            });
            return result;
        });
    };
    Container.prototype.hyphenToCamel = function (hyphen) {
        return hyphen.replace(/-([a-z])/g, function (match, index) {
            return match[1].toUpperCase();
        });
    };
    Container.prototype.addEventListener = function (scope, typeStr, listenerFunc, data, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        var that = this;
        var scopedEventListener = function (e) {
            listenerFunc.apply(scope, [new Event(typeStr, that, data, e)]);
        };
        _super.prototype.addEventListener.call(this, scope, typeStr, listenerFunc, data, useCapture, scopedEventListener);
        if (this._element.addEventListener) {
            this._element.addEventListener(typeStr, scopedEventListener, useCapture);
        }
        else if (this._element["attachEvent"]) {
            this._element["attachEvent"]('on' + typeStr, scopedEventListener);
            this._element["attachEvent"]("onpropertychange", function (e) {
                if (e.eventType === typeStr) {
                    e.cancelBubble = true;
                    e.returnValue = false;
                    e.data = e.customData;
                    scopedEventListener(e);
                }
            });
        }
    };
    Container.prototype.removeEventListener = function (typeStr, listenerFunc) {
        var listener = _super.prototype.removeEventListener.call(this, typeStr, listenerFunc);
        if (listener) {
            if (this._element.removeEventListener) {
                this._element.removeEventListener(typeStr, listener.scopedEventListener, listener.useCapture);
            }
            else if (this._element["detachEvent"]) {
                this._element["detachEvent"]('on' + typeStr, listenerFunc);
            }
        }
        return listener;
    };
    Container.prototype.preventDefault = function (e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    };
    Container.prototype.responsive = function (config) {
        this.responsiveRules = config;
        this.addResizeListener();
        this.resizeHandler(null);
    };
    Container.prototype.addResizeListener = function () {
        var _this = this;
        window.addEventListener("resize", function (event) {
            _this.resizeHandler(event);
        });
    };
    Container.prototype.resizeHandler = function (e) {
        var width = Window.width;
        var mergedRules = {};
        var duration = 0;
        if (Array.isArray(this.responsiveRules)) {
            var rulesArray = this.responsiveRules;
            for (var index = 0; index < rulesArray.length; index++) {
                var rule = rulesArray[index];
                if (rule.duration) {
                    duration = rule.duration;
                }
                mergedRules = this.calculateResponsiveStyles(width, rule, mergedRules);
            }
        }
        else {
            var rule = this.responsiveRules;
            if (rule.duration) {
                duration = rule.duration;
            }
            mergedRules = this.calculateResponsiveStyles(width, rule);
        }
        if (duration === 0) {
            Properties.style(this._element, mergedRules);
        }
        else {
            this.to({
                duration: duration,
                toVars: mergedRules
            });
        }
    };
    Container.prototype.calculateResponsiveStyles = function (width, rule, mergedRules) {
        if (mergedRules === void 0) { mergedRules = {}; }
        if (rule.maxWidth && rule.maxWidth !== 0) {
            if (width <= rule.maxWidth) {
                if (rule.minWidth || rule.minWidth === 0) {
                    if (width > rule.minWidth) {
                        mergedRules = ObjectUtils.merge(mergedRules, rule.style);
                    }
                }
                else {
                    mergedRules = ObjectUtils.merge(mergedRules, rule.style);
                }
            }
        }
        else {
            if (rule.minWidth || rule.minWidth === 0) {
                if (width > rule.minWidth) {
                    mergedRules = ObjectUtils.merge(mergedRules, rule.style);
                }
            }
        }
        return mergedRules;
    };
    Object.defineProperty(Container.prototype, "width", {
        get: function () {
            return this.shadow().width;
        },
        set: function (w) {
            Properties.style(this._element, { width: w });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "height", {
        get: function () {
            return this.shadow().height;
        },
        set: function (h) {
            Properties.style(this._element, { height: h });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "y", {
        get: function () {
            return this._element.offsetTop;
        },
        set: function (yPos) {
            Properties.style(this._element, { y: yPos });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "x", {
        get: function () {
            return this._element.offsetLeft;
        },
        set: function (xPos) {
            Properties.style(this._element, { x: xPos });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "alpha", {
        get: function () {
            return parseFloat(this._element.style.opacity);
        },
        set: function (value) {
            Properties.style(this._element, { opacity: value.toString() });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (_data) {
            this._data = _data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "innerText", {
        get: function () {
            return this._element.innerText;
        },
        set: function (text) {
            this._element.innerText = text;
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.hide = function () {
        Properties.style(this._element, { display: "none" });
    };
    Container.prototype.show = function () {
        Properties.style(this._element, { display: "block" });
    };
    Container.prototype.fillContainer = function () {
        Properties.style(this._element, {
            minWidth: "100%",
            minHeight: "100%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            position: "relative"
        });
    };
    Container.prototype.centreHorizontal = function () {
        Properties.style(this._element, {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative"
        });
    };
    Container.prototype.centreHorizontalText = function () {
        Properties.style(this._element, {
            textAlign: "center"
        });
    };
    Container.prototype.shadow = function () {
        if (!document.body.contains(this._element)) {
            var parent = this._element.parentElement;
            document.body.appendChild(this._element);
            var dimensions = this.dimensionsPolyfill();
            document.body.removeChild(this._element);
            if (parent) {
                parent.appendChild(this._element);
            }
            else {
                document.body.removeChild(this._element);
            }
            return dimensions;
        }
        else {
            return this.dimensionsPolyfill();
        }
    };
    Container.prototype.dimensionsPolyfill = function () {
        var height = this._element.getBoundingClientRect().height;
        var width = this._element.getBoundingClientRect().width;
        if (width && height) {
        }
        else {
            width = this._element.scrollWidth;
            height = this._element.scrollHeight;
        }
        var dimensions = new Dimensions(width, height);
        return dimensions;
    };
    Object.defineProperty(Container.prototype, "value", {
        get: function () {
            var inputElement = this._element;
            return inputElement.value;
        },
        set: function (_value) {
            var inputElement = this._element;
            inputElement.value = _value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "id", {
        get: function () {
            return this._element.id;
        },
        set: function (identifier) {
            this._element.id = identifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "innerHtml", {
        get: function () {
            return this._element.innerHTML;
        },
        set: function (html) {
            this._element.innerHTML = html;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "href", {
        get: function () {
            var element = this._element;
            return element.href;
        },
        set: function (link) {
            var element = this._element;
            element.href = link;
        },
        enumerable: true,
        configurable: true
    });
    Container.TRANSITION_COMPLETE = "TRANSITION_COMPLETE";
    return Container;
}(EventDispatcher));

var Dimensions$1 = (function () {
    function Dimensions(width, height) {
        this.width = width;
        this.height = height;
    }
    return Dimensions;
}());

var Button$1 = (function (_super) {
    __extends(Button, _super);
    function Button(config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        config = ObjectUtils.merge(ObjectUtils.merge({}, Styles.button), config);
        _this = _super.call(this, config) || this;
        _this.stateOver = false;
        _this.enabled = true;
        _this.styles = Styles.button;
        if (config) {
            _this.styles = config;
            if (config.styles) {
                config.styles.map(function (style) {
                    ObjectUtils.merge(_this.styles, style);
                });
            }
            if (config.style) {
                ObjectUtils.merge(_this.styles, config.style);
            }
        }
        _this.addEventListener(_this, "mouseover", _this.over);
        _this.addEventListener(_this, "mouseout", _this.out);
        return _this;
    }
    Button.prototype.over = function () {
        if (this.styles.hover) {
            if (this.enabled) {
                this.stateOver = true;
                this.to({
                    duration: this.styles.hover.durationIn,
                    toVars: {
                        backgroundColor: this.styles.hover.backgroundColor,
                        color: this.styles.hover.color
                    }
                });
            }
        }
    };
    Button.prototype.out = function () {
        if (this.styles.hover) {
            if (this.enabled) {
                this.stateOver = false;
                this.to({
                    duration: this.styles.hover.durationOut,
                    toVars: {
                        backgroundColor: this.styles.backgroundColor,
                        color: this.styles.color
                    }
                });
            }
        }
    };
    Button.prototype.click = function () {
        if (this.enabled) {
            var event = new Event(Button.CLICK, this);
            this.dispatchEvent(event);
        }
    };
    Button.prototype.disable = function () {
        this.enabled = false;
        this.style({ cursor: "default" });
        this.element.setAttribute("disabled", "true");
    };
    Button.prototype.select = function () {
        this.enabled = false;
        this.style({ cursor: "default" });
    };
    Button.prototype.enable = function () {
        this.enabled = true;
        this.style({ cursor: "pointer" });
        this.element.removeAttribute("disabled");
    };
    Button.prototype.style = function (style) {
        ObjectUtils.merge(this.styles, style);
        _super.prototype.style.call(this, style);
    };
    Button.CLICK = "click";
    return Button;
}(Container));

var DropDown = (function (_super) {
    __extends(DropDown, _super);
    function DropDown(config) {
        var _this = _super.call(this, {
            id: config.id || "drop-down"
        }) || this;
        _this.items = [];
        _this.buttonStyle = ObjectUtils.merge({}, Styles.drop);
        if (config.styles) {
            config.styles.map(function (style) {
                _this.buttonStyle = ObjectUtils.merge(_this.buttonStyle, style);
                if (style.button) {
                    _this.buttonStyle = ObjectUtils.merge(_this.buttonStyle, style.button);
                }
            });
        }
        if (config.style) {
            _this.buttonStyle = ObjectUtils.merge(_this.buttonStyle, config.style);
            if (config.style.button) {
                _this.buttonStyle = ObjectUtils.merge(_this.buttonStyle, config.style.button);
            }
        }
        _this.buttonStyle.zIndex = "1337";
        _this.button = new Button$1({
            style: _this.buttonStyle,
            text: config.text
        });
        _this.addChild(_this.button);
        var caretStyle = ObjectUtils.merge({}, Styles.drop.caret);
        if (config.styles) {
            config.styles.map(function (style) {
                if (style.color) {
                    caretStyle.borderTopColor = style.color;
                }
                if (style.caret) {
                    caretStyle = ObjectUtils.merge(caretStyle, style.caret);
                }
            });
        }
        if (config.style) {
            if (config.style.color) {
                caretStyle.borderTopColor = config.style.color;
            }
            if (config.style.caret) {
                caretStyle = ObjectUtils.merge(caretStyle, config.style.caret);
            }
        }
        _this.caret = new Container({
            id: "drop-caret",
            style: caretStyle
        });
        _this.button.addChild(_this.caret);
        _this.button.addEventListener(_this, "mouseup", _this.buttonClicked);
        _this.button.addEventListener(_this, "mouseover", _this.buttonOver);
        _this.button.addEventListener(_this, "mouseout", _this.buttonOut);
        _this.dropStyle = ObjectUtils.merge({}, Styles.drop);
        if (config.styles) {
            config.styles.map(function (style) {
                _this.dropStyle = ObjectUtils.merge(_this.dropStyle, style);
            });
        }
        if (config.style) {
            _this.dropStyle = ObjectUtils.merge(_this.dropStyle, config.style);
        }
        _this.unorderedList = new Container({
            type: "ul",
            styles: [
                _this.dropStyle,
                {
                    listStyle: "none",
                    zIndex: "1336",
                    position: "absolute",
                    overflow: "hidden",
                    padding: "0rem",
                    marginTop: _this.dropStyle.dropGap
                }
            ]
        });
        _this.addChild(_this.unorderedList);
        _this.itemStyle = ObjectUtils.merge({}, Styles.drop);
        _this.itemStyle.borderStyle = "";
        _this.itemStyle.borderWidth = "";
        _this.itemStyle.borderColor = "";
        _this.itemStyle.borderImage = "";
        if (config.styles) {
            config.styles.map(function (style) {
                _this.itemStyle = ObjectUtils.merge(_this.itemStyle, style);
                _this.itemStyle.borderStyle = "";
                _this.itemStyle.borderWidth = "";
                _this.itemStyle.borderColor = "";
                _this.itemStyle.borderImage = "";
                if (style.item) {
                    _this.itemStyle = ObjectUtils.merge(_this.itemStyle, style.item);
                }
            });
        }
        if (config.style) {
            if (config.style.item) {
                _this.itemStyle = ObjectUtils.merge(_this.itemStyle, config.style.item);
            }
            else {
                _this.itemStyle = ObjectUtils.merge(_this.itemStyle, config.style);
            }
            _this.itemStyle.borderStyle = "";
            _this.itemStyle.borderWidth = "";
            _this.itemStyle.borderColor = "";
            _this.itemStyle.borderImage = "";
        }
        var count = 0;
        config.options.forEach(function (option) {
            var item = new Container({
                data: option,
                type: "li",
                text: option,
                styles: [
                    _this.itemStyle,
                    {
                        display: "list-item",
                        cursor: "pointer"
                    }
                ]
            });
            _this.unorderedList.addChild(item);
            _this.items.push(item);
            item.addEventListener(_this, "mouseover", _this.itemOver);
            item.addEventListener(_this, "mouseout", _this.itemOut);
            item.addEventListener(_this, "mouseup", _this.itemClicked);
            count++;
        });
        if (!_this.itemStyle.backgroundColor) {
            _this.itemStyle.backgroundColor = _this.dropStyle.backgroundColor;
        }
        if (!_this.itemStyle.color) {
            _this.itemStyle.color = _this.dropStyle.color;
        }
        _this.unorderedList.style({
            display: "none"
        });
        _this.style({
            position: "relative"
        });
        _this.durationContract = Styles.drop.durationContract;
        _this.durationExpand = Styles.drop.durationExpand;
        if (config.styles) {
            config.styles.map(function (style) {
                if (style.durationExpand) {
                    _this.durationExpand = style.durationExpand;
                }
                if (style.durationContract) {
                    _this.durationContract = style.durationContract;
                }
            });
        }
        if (config.style) {
            if (config.style.durationExpand) {
                _this.durationExpand = config.style.durationExpand;
            }
            if (config.style.durationContract) {
                _this.durationContract = config.style.durationContract;
            }
        }
        return _this;
    }
    DropDown.prototype.buttonOver = function (e) {
        if (this.buttonStyle.hover) {
            this.caret.to({
                duration: this.buttonStyle.hover.durationIn,
                toVars: {
                    borderTopColor: this.buttonStyle.hover.color,
                }
            });
        }
    };
    DropDown.prototype.buttonOut = function (e) {
        if (this.buttonStyle.hover) {
            this.caret.to({
                duration: this.buttonStyle.hover.durationOut,
                toVars: {
                    borderTopColor: this.buttonStyle.color,
                }
            });
        }
    };
    DropDown.prototype.itemClicked = function (e) {
        var _this = this;
        var element = e.target;
        this.dispatchEvent(new Event(DropDown.CHANGE, this, element.data));
        this.unorderedList.style({
            opacity: "1"
        });
        this.unorderedList.to({
            duration: this.durationContract,
            delay: 0.3,
            toVars: {
                opacity: "0"
            }
        })
            .then(function () {
            _this.unorderedList.style({
                display: "none"
            });
        });
    };
    DropDown.prototype.itemOver = function (e) {
        var element = e.target;
        element.to({
            duration: this.itemStyle.hover.durationIn,
            toVars: {
                backgroundColor: this.itemStyle.hover.backgroundColor,
                color: this.itemStyle.hover.color,
            }
        });
    };
    DropDown.prototype.itemOut = function (e) {
        var element = e.target;
        element.to({
            duration: this.itemStyle.hover.durationOut,
            toVars: {
                backgroundColor: this.itemStyle.backgroundColor,
                color: this.itemStyle.color
            }
        });
    };
    DropDown.prototype.buttonClicked = function (e) {
        var _this = this;
        this.unorderedList.style({
            display: "block",
        });
        this.unorderedList.fromTo({
            duration: this.durationExpand,
            immediateRender: true,
            fromVars: {
                opacity: "0",
                transform: "translateY(-10px)"
            },
            toVars: {
                opacity: "1",
                transform: "translateY(0px)"
            }
        });
        this.scopedEventHandler = function (g) { _this.closeDrop(g); };
        document.addEventListener("mouseup", this.scopedEventHandler, true);
        this.button.removeEventListener("mouseup", this.buttonClicked);
    };
    DropDown.prototype.closeDrop = function (e) {
        var _this = this;
        document.removeEventListener("mouseup", this.scopedEventHandler, true);
        setTimeout(function () {
            _this.button.addEventListener(_this, "mouseup", _this.buttonClicked);
        }, 10);
        this.unorderedList.to({
            duration: this.durationContract,
            toVars: {
                opacity: "0",
            }
        })
            .then(function () {
            _this.unorderedList.style({
                display: "none"
            });
        });
    };
    DropDown.prototype.disable = function () {
        this.button.disable();
        this.button.removeEventListener(Button$1.CLICK, this.buttonClicked);
    };
    DropDown.prototype.enable = function () {
        this.button.enable();
        this.button.addEventListener(this, Button$1.CLICK, this.buttonClicked);
    };
    DropDown.CHANGE = "change";
    return DropDown;
}(Container));

var Ease = (function () {
    function Ease() {
    }
    Ease.Linear = "linear";
    Ease.Ease = "ease";
    Ease.EaseIn = "ease-in";
    Ease.EaseOut = "ease-out";
    Ease.EaseInOut = "ease-in-out";
    return Ease;
}());

var Event$1 = (function () {
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
var EventDispatcher$1 = (function () {
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

var Image = (function (_super) {
    __extends(Image, _super);
    function Image(config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        config.type = "img";
        var src;
        if (config.path) {
            src = config.path;
            config.path = null;
        }
        if (config.src) {
            src = config.src;
            config.src = null;
        }
        _this = _super.call(this, config) || this;
        _this.load(src);
        return _this;
    }
    Image.prototype.load = function (src) {
        this.element.setAttribute("src", src);
    };
    Image.COMPLETE = "load";
    Image.ERROR = "error";
    return Image;
}(Container));

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
        return new promise(function (resolve, reject) {
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

var ObjectUtils$1 = (function () {
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

var Pages = (function (_super) {
    __extends(Pages, _super);
    function Pages(config) {
        var _this = _super.call(this, {
            id: config.id,
            style: {
                position: "relative"
            }
        }) || this;
        _this.pages = {};
        _this.zIndex = 100;
        _this.routes = true;
        _this.config = config;
        _this.style(config.style);
        if (config.routes === false) {
            _this.routes = false;
        }
        if (_this.routes) {
            window.addEventListener('popstate', function (event) {
                var page;
                if (event.state === null) {
                    page = window.location.pathname;
                }
                else {
                    page = event.state;
                }
                _this.changePage(page);
            });
            _this.changePage(window.location.pathname);
        }
        return _this;
    }
    Pages.prototype.update = function (page) {
        page = decodeURIComponent(page);
        if (page !== this.currentPageName) {
            if (this.routes) {
                history.pushState(null, null, page);
            }
            this.changePage(page);
        }
    };
    Pages.prototype.changePage = function (page) {
        var _this = this;
        this.currentPageName = page;
        if (this.config.pages[page]) {
            clearTimeout(this.delayTimeout);
            if (this.currentPage) {
                if (this.currentPage.sleep) {
                    this.currentPage.sleep();
                }
                if (this.config.delayTransition) {
                    var viewToRemove_1 = this.currentPage;
                    this.delayTimeout = setTimeout(function () {
                        _this.removeChild(viewToRemove_1);
                    }, this.config.delayTransition * 1000);
                }
                else {
                    this.removeChild(this.currentPage);
                }
            }
            if (this.pages[page]) {
            }
            else {
                var pageTemp = new this.config.pages[page](page);
                this.pages[page] = pageTemp;
            }
            this.currentPage = this.pages[page];
            if (this.currentPage.wake) {
                this.currentPage.wake();
            }
            this.currentPage.style({
                position: "absolute",
                width: "100%",
                top: "0px",
                left: "0px"
            });
            this.addChild(this.currentPage);
        }
        else {
            if (this.config.redirect) {
                this.update("/");
            }
            else {
                if (this.config.errorPage) {
                    this.changePage(this.config.errorPage);
                }
            }
        }
    };
    return Pages;
}(Container));

var Properties$1 = (function () {
    function Properties() {
    }
    Properties.style = function (object, vars) {
        var element;
        if (object.element) {
            element = object.element;
        }
        else {
            element = object;
        }
        for (var i in vars) {
            if (vars.hasOwnProperty(i)) {
                var value = vars[i];
                if (typeof (value) === "number") {
                    if (value) {
                        switch (i) {
                            case "x":
                                value = vars[i].toString();
                                value += "px";
                                break;
                            case "y":
                                value = vars[i].toString();
                                value += "px";
                                break;
                            case "height":
                                value = vars[i].toString();
                                value += "px";
                                break;
                            case "width":
                                value = vars[i].toString();
                                value += "px";
                                break;
                            default:
                                break;
                        }
                    }
                }
                var styleName = i;
                switch (i) {
                    case "x":
                        styleName = "left";
                        break;
                    case "y":
                        styleName = "top";
                        break;
                    case "alpha":
                        styleName = "opacity";
                        break;
                    default:
                        break;
                }
                element.style[styleName] = value;
            }
        }
    };
    return Properties;
}());

var RadioButton = (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton(config) {
        var _this = _super.call(this, {
            type: "input"
        }) || this;
        var element = _this.element;
        element.type = "radio";
        if (config) {
            if (config.id) {
                _this.id = config.id;
            }
            _this.style(config.style);
            _this.style(config);
            element.checked = config.checked;
        }
        return _this;
    }
    Object.defineProperty(RadioButton.prototype, "checked", {
        get: function () {
            var element = this.element;
            return element.checked;
        },
        enumerable: true,
        configurable: true
    });
    RadioButton.CLICK = "click";
    return RadioButton;
}(Container));

var Resize = (function () {
    function Resize() {
    }
    Resize.proportionalOutside = function (source, target) {
        var ratio = source.width / source.height;
        var targetWidth = target.width;
        var targetHeight = target.width / ratio;
        if (targetHeight < target.height) {
            targetHeight = target.height;
            targetWidth = targetHeight * ratio;
        }
        return { height: targetHeight, width: targetWidth };
    };
    Resize.proportionalInside = function (source, target) {
        var ratio = source.width / source.height;
        var targetWidth = target.width;
        var targetHeight = target.width * ratio;
        if (targetHeight > target.height) {
            targetHeight = target.height;
            targetWidth = targetHeight * ratio;
        }
        return { height: targetHeight, width: targetWidth };
    };
    return Resize;
}());

var RootContainer = (function (_super) {
    __extends(RootContainer, _super);
    function RootContainer() {
        return _super.call(this, {
            root: true
        }) || this;
    }
    return RootContainer;
}(Container));

var Select = (function (_super) {
    __extends(Select, _super);
    function Select(config) {
        var _this = this;
        config.type = "select";
        _this = _super.call(this, config) || this;
        var element = _this.element;
        if (config.name) {
            element.name = config.name;
        }
        _this.addOptions(config.options);
        return _this;
    }
    Select.prototype.addOptions = function (options) {
        var _this = this;
        var element = this.element;
        options.forEach(function (option) {
            var item = new Container({
                text: option.text,
                type: "option",
                attributes: {
                    'value': option.value
                }
            });
            _this.appendChild(item);
        });
    };
    Object.defineProperty(Select.prototype, "value", {
        get: function () {
            var element = this.element;
            return element.value;
        },
        set: function (_value) {
            var element = this.element;
            element.value = _value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "selectedIndex", {
        get: function () {
            var element = this.element;
            return element.selectedIndex;
        },
        set: function (selectedIndex) {
            var element = this.element;
            element.selectedIndex = selectedIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "options", {
        get: function () {
            var element = this.element;
            var options = [];
            for (var i = 0; i < element.options.length; i++) {
                var elem = element.options[i];
                options.push({ value: elem.value, text: elem.text });
            }
            return options;
        },
        set: function (options) {
            var element = this.element;
            element.innerHTML = '';
            this.addOptions(options);
        },
        enumerable: true,
        configurable: true
    });
    Select.CHANGE = "change";
    return Select;
}(Container));

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

var Styles$1 = (function () {
    function Styles() {
    }
    Styles.button = {
        whiteSpace: "nowrap",
        msTouchAction: "manipulation",
        touchAction: "manipulation",
        cursor: "pointer",
        webkitUserSelect: "none",
        mozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        text: "Button",
        icon: {
            padding: "0.75rem"
        },
        type: "button",
        attributes: {
            type: "button"
        }
    };
    Styles.drop = {
        fontFamily: "sans-serif",
        fontSize: "1.2rem",
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: "1rem",
        durationExpand: 0.5,
        durationContract: 0.5,
        border: "2px solid transparent",
        borderColor: "#eeeeee",
        dropGap: "0.1rem",
        hover: {
            backgroundColor: "#dddddd",
            color: "#000000",
            durationIn: 0,
            durationOut: 0.5,
        },
        caret: {
            width: "0px",
            height: "0px",
            borderLeftWidth: "0.35rem",
            borderLeftStyle: "solid",
            borderLeftColor: "transparent",
            borderRightWidth: "0.35rem",
            borderRightStyle: "solid",
            borderRightColor: "transparent",
            borderTopWidth: "0.35rem",
            borderTopStyle: "solid",
            borderTopColor: "black",
            display: "inline-block",
            verticalAlign: "middle",
            marginLeft: "0.35rem",
            pointerEvents: "none",
            transform: "translateY(-0.1rem)"
        }
    };
    return Styles;
}());

var Window$1 = (function () {
    function Window() {
    }
    Window.scrollY = function () {
        var scrollTop = document.body.scrollTop;
        if (scrollTop == 0) {
            if (window.pageYOffset) {
                scrollTop = window.pageYOffset;
            }
            else {
                scrollTop = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
            }
        }
        return scrollTop;
    };
    Window.scrollX = function () {
        var scrollLeft = document.body.scrollLeft;
        if (scrollLeft == 0) {
            if (window.pageXOffset) {
                scrollLeft = window.pageXOffset;
            }
            else {
                scrollLeft = (document.body.parentElement) ? document.body.parentElement.scrollLeft : 0;
            }
        }
        return scrollLeft;
    };
    Object.defineProperty(Window, "height", {
        get: function () {
            return window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window, "width", {
        get: function () {
            return window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    return Window;
}());

exports.Anchor = Anchor;
exports.Button = Button;
exports.CheckBox = CheckBox;
exports.Container = Container$1;
exports.Dimensions = Dimensions$1;
exports.DropDown = DropDown;
exports.Ease = Ease;
exports.Event = Event$1;
exports.EventDispatcher = EventDispatcher$1;
exports.Image = Image;
exports.Loader = Loader;
exports.LoaderEvent = LoaderEvent;
exports.ObjectUtils = ObjectUtils$1;
exports.Observer = Observer;
exports.Pages = Pages;
exports.Properties = Properties$1;
exports.RadioButton = RadioButton;
exports.Resize = Resize;
exports.RootContainer = RootContainer;
exports.Select = Select;
exports.ShivaEvent = ShivaEvent;
exports.Styles = Styles$1;
exports.Window = Window$1;
