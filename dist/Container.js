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
import Promise from 'promise-polyfill';
import { Dimensions } from './Dimensions';
import { Event, EventDispatcher } from './EventDispatcher';
import { ObjectUtils } from './ObjectUtils';
import { Properties } from './Properties';
import { Window } from './Window';
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
            return new Promise(function (resolve, reject) {
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
        return new Promise(function (resolve, reject) {
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
            var parent_1 = this._element.parentElement;
            document.body.appendChild(this._element);
            var dimensions = this.dimensionsPolyfill();
            document.body.removeChild(this._element);
            if (parent_1) {
                parent_1.appendChild(this._element);
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
export { Container };
