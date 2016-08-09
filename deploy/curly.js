var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var curly;
(function (curly) {
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
                                case "backgroundColor":
                                    // let red = vars[i] >> 16;
                                    // let green = (vars[i] >> 8) & 255;
                                    // let blue = vars[i] & 255;
                                    value = "rgb(" + (vars[i] >> 16) + "," + ((vars[i] >> 8) & 255) + "," + (vars[i] & 255) + ")";
                                    break;
                                case "color":
                                    value = "rgb(" + (vars[i] >> 16) + "," + ((vars[i] >> 8) & 255) + "," + (vars[i] & 255) + ")";
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
    curly.Properties = Properties;
})(curly || (curly = {}));
/**
 * EventDispatcher (TypeScript)
 * - Simple extendable event dispatching class
 *
 * @version 0.1.5
 * @author John Vrbanac
 * @license MIT License
 **/
var curly;
(function (curly) {
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
            // getTarget(): any {
            //     return this._target;
            // }
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
    curly.Event = Event;
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
                scopedEventListener: scopedEventListener
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
                    this._listeners[i].listener.call(this._listeners[i].scope, evt);
                }
            }
        };
        return EventDispatcher;
    }());
    curly.EventDispatcher = EventDispatcher;
})(curly || (curly = {}));
/// <reference path="properties.ts" />
/// <reference path="EventDispatcher.ts" />
/**
 * curly.Container (TypeScript)
 * - Container
 *
 * @version 0.1.5
 * @author Gabriel McCallin
 * @license MIT License
 **/
var curly;
(function (curly) {
    var Container = (function (_super) {
        __extends(Container, _super);
        function Container(config) {
            _super.call(this);
            if (config) {
                if (config.root) {
                    this._element = document.createElement("div");
                    document.body.appendChild(this._element);
                }
                else {
                    if (config.type) {
                        this._element = document.createElement(config.type);
                    }
                    else {
                        this._element = document.createElement("div");
                    }
                }
                if (config.id) {
                    this._element.id = config.id;
                }
                if (config.text) {
                    this.innerHtml = config.text;
                }
                this.style(config.style);
                this.style(config);
            }
            else {
                this._element = document.createElement("div");
            }
            // seen some issues with the default static
            // this._element.style.position = "relative";
        }
        Container.prototype.addToBody = function () {
            document.body.appendChild(this._element);
        };
        Container.prototype.style = function (vars) {
            curly.Properties.style(this._element, vars);
        };
        Container.prototype.className = function () {
            var _this = this;
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            names.map((function (name) {
                _this._element.className = name;
            }));
        };
        Container.prototype.addChild = function (child) {
            var childElement;
            if (child.element) {
                childElement = child.element;
            }
            else {
                childElement = child;
            }
            this._element.appendChild(childElement);
        };
        Container.prototype.removeChild = function (child) {
            if (this._element === child.element.parentNode) {
                this._element.removeChild(child.element);
            }
        };
        Container.prototype.to = function (duration, vars) {
            return TweenMax.to(this._element, duration, vars);
        };
        Container.prototype.fromTo = function (duration, fromVars, toVars) {
            return TweenMax.fromTo(this._element, duration, fromVars, toVars);
        };
        Container.prototype.from = function (duration, vars) {
            return TweenMax.from(this._element, duration, vars);
        };
        Container.prototype.addEventListener = function (scope, typeStr, listenerFunc, data, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            var that = this;
            var scopedEventListener = function (e) {
                // console.log("captured at add", e); 
                listenerFunc.apply(scope, [new curly.Event(typeStr, that, data, e)]);
            };
            _super.prototype.addEventListener.call(this, scope, typeStr, listenerFunc, useCapture, data, scopedEventListener);
            // add to element 
            if (this._element.addEventListener) {
                // Firefox, Google Chrome and Safari (and Opera and Internet Explorer from
                // version 9).
                this._element.addEventListener(typeStr, scopedEventListener, useCapture);
            }
            else if (this._element["attachEvent"]) {
                // Opera and Explorer (version < 9).
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
            if (this._element.removeEventListener) {
                // Firefox, Google Chrome and Safari (and Opera and Internet Explorer from
                // version 9).
                this._element.removeEventListener(typeStr, listener.scopedEventListener, listener.useCapture);
            }
            else if (this._element["detachEvent"]) {
                // Opera and Explorer (version < 9).
                this._element["detachEvent"]('on' + typeStr, listenerFunc);
            }
            return listener;
        };
        Container.prototype.preventDefault = function (e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
        };
        Object.defineProperty(Container.prototype, "width", {
            get: function () {
                return this.shadow().width;
            },
            set: function (w) {
                curly.Properties.style(this._element, { width: w });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "height", {
            get: function () {
                return this.shadow().height;
            },
            set: function (h) {
                curly.Properties.style(this._element, { height: h });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "y", {
            get: function () {
                return this._element.offsetTop;
            },
            set: function (yPos) {
                curly.Properties.style(this._element, { y: yPos });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "x", {
            get: function () {
                return this._element.offsetLeft;
            },
            set: function (xPos) {
                curly.Properties.style(this._element, { x: xPos });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "alpha", {
            get: function () {
                return parseFloat(this._element.style.opacity);
            },
            set: function (value) {
                curly.Properties.style(this._element, { opacity: value.toString() });
            },
            enumerable: true,
            configurable: true
        });
        Container.prototype.hide = function () {
            curly.Properties.style(this._element, { display: "none" });
        };
        Container.prototype.show = function () {
            curly.Properties.style(this._element, { display: "block" });
        };
        Container.prototype.fillContainer = function () {
            curly.Properties.style(this._element, {
                minWidth: "100%",
                minHeight: "100%",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                position: "relative"
            });
        };
        Container.prototype.centreHorizontal = function () {
            curly.Properties.style(this._element, {
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative"
            });
        };
        Container.prototype.centreHorizontalText = function () {
            curly.Properties.style(this._element, {
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
            // width = this._element.scrollWidth;
            // height = this._element.scrollHeight;
            if (width && height) {
            }
            else {
                // fallback to scrollwidth and scrollheight
                width = this._element.scrollWidth;
                height = this._element.scrollHeight;
            }
            var dimensions = new curly.Dimensions(width, height);
            return dimensions;
        };
        Object.defineProperty(Container.prototype, "value", {
            get: function () {
                var inputElement = this._element;
                return inputElement.value;
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
        return Container;
    }(curly.EventDispatcher));
    curly.Container = Container;
})(curly || (curly = {}));
/// <reference path="Container.ts" />
var curly;
(function (curly) {
    var Anchor = (function (_super) {
        __extends(Anchor, _super);
        function Anchor(config) {
            config.type = "a";
            _super.call(this, config);
            var element = this.element;
            element.href = config.href;
        }
        return Anchor;
    }(curly.Container));
    curly.Anchor = Anchor;
})(curly || (curly = {}));
/// <reference path="container.ts" />
var curly;
(function (curly) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(config) {
            var type;
            if (config.href) {
                type = "a";
            }
            else {
                type = "button";
            }
            _super.call(this, {
                id: config.id,
                type: type,
                cursor: "pointer",
                style: curly.Styles.button
            });
            this.href = config.href;
            this.enabled = true;
            if (config.icon && config.icon.code) {
                this.icon = new curly.Container({
                    type: "span",
                    text: config.icon.code
                });
            }
            this.update(config);
        }
        Button.prototype.update = function (config) {
            this.config = {};
            if (config && config.style) {
                for (var i in config.style) {
                    this.config[i] = config.style[i];
                }
            }
            for (var i in config) {
                this.config[i] = config[i];
            }
            if (config.style) {
                for (var i in config.style.icon) {
                    this.config.icon[i] = config.style.icon[i];
                }
            }
            this.innerHtml = config.text;
            this.addEventListener(this, "mouseover", this.overWithEnable);
            this.addEventListener(this, "mouseout", this.outWithEnable);
            if (this.config.icon && this.config.icon.code) {
                if (this.config.icon.align === "left") {
                    this.icon.style({
                        paddingRight: this.config.icon.padding,
                    });
                }
                else {
                    this.icon.style({
                        paddingLeft: this.config.icon.padding
                    });
                }
                this.icon.style({
                    fontFamily: this.config.icon.fontFamily,
                    fontSize: this.config.icon.fontSize,
                    float: this.config.icon.align,
                    pointerEvents: "none"
                });
                this.addChild(this.icon);
            }
            //anything else in the config
            this.style(this.config);
        };
        Button.prototype.over = function () {
            this.to(this.config.durationIn, {
                backgroundColor: this.config.backgroundColorHover,
                // backgroundColor: "#ff0000",
                color: this.config.colorHover
            });
        };
        Button.prototype.out = function () {
            this.to(this.config.durationOut, {
                backgroundColor: this.config.backgroundColor,
                color: this.config.color
            });
        };
        Button.prototype.click = function (e) {
            if (this.enabled) {
                //this.out();
                var event = new curly.Event(Button.CLICK, this, e);
                this.dispatchEvent(event);
            }
        };
        Button.prototype.disable = function () {
            this.enabled = false;
            this.style({ cursor: "default" });
        };
        Button.prototype.select = function () {
            this.enabled = false;
            this.style({ cursor: "default" });
        };
        Button.prototype.enable = function () {
            this.enabled = true;
            this.style({ cursor: "pointer" });
            this.out();
        };
        Object.defineProperty(Button.prototype, "data", {
            get: function () {
                return this.config.data;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.overWithEnable = function (e) {
            if (this.enabled) {
                this.over();
            }
        };
        Button.prototype.outWithEnable = function (e) {
            if (this.enabled) {
                this.out();
            }
        };
        Button.CLICK = "click";
        return Button;
    }(curly.Container));
    curly.Button = Button;
})(curly || (curly = {}));
/// <reference path="container.ts" />
var curly;
(function (curly) {
    var CheckBox = (function (_super) {
        __extends(CheckBox, _super);
        function CheckBox(config) {
            _super.call(this, {
                type: "input"
            });
            var element = this.element;
            element.type = "checkbox";
            if (config) {
                if (config.id) {
                    this.id = config.id;
                }
                this.style(config.style);
                //anything else in the config
                this.style(config);
                element.checked = config.checked;
            }
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
    }(curly.Container));
    curly.CheckBox = CheckBox;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var Dimensions = (function () {
        function Dimensions(width, height) {
            this.width = width;
            this.height = height;
        }
        return Dimensions;
    }());
    curly.Dimensions = Dimensions;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image(config) {
            config.type = "img";
            _super.call(this, config);
            this.load(config.path);
            // this.addEventListener(this, "load", this.loaded);
            // this.addEventListener(this, "error", this.error);
        }
        Image.prototype.load = function (path) {
            this.element.setAttribute("src", path);
        };
        return Image;
    }(curly.Container));
    curly.Image = Image;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var Observer = (function () {
        function Observer() {
        }
        Observer.addEventListener = function (scope, type, callback) {
            if (!this.observers[type]) {
                this.observers[type] = [];
            }
            console.log("ADDING OBSERVER: ", type);
            this.observers[type].push({ scope: scope, type: type, callback: callback });
        };
        Observer.removeEventListener = function (type, callback) {
            var indexOfClosureToRemove;
            for (var i = 0; i < this.observers[type].length; i++) {
                if (this.observers[type].callback === callback) {
                    indexOfClosureToRemove = i;
                    console.log("REMOVING OBSERVER: ", type);
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
            else {
                console.log("DISPATCH ERROR: NO OBSERVER REGISTERED");
            }
        };
        Observer.observers = {};
        return Observer;
    }());
    curly.Observer = Observer;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var Resize = (function () {
        function Resize() {
        }
        Resize.proportionalOutside = function (objectWidth, objectHeight, areaWidth, areaHeight) {
            var ratio = objectWidth / objectHeight;
            var targetWidth = areaWidth;
            var targetHeight = areaWidth / ratio;
            //
            if (targetHeight < areaHeight) {
                targetHeight = areaHeight;
                targetWidth = targetHeight * ratio;
            }
            return { height: targetHeight, width: targetWidth };
        };
        Resize.proportionalInside = function (objectWidth, objectHeight, areaWidth, areaHeight) {
            var ratio = objectWidth / objectHeight;
            var targetWidth = areaWidth;
            var targetHeight = areaWidth * ratio;
            if (targetHeight > areaHeight) {
                targetHeight = areaHeight;
                targetWidth = targetHeight * ratio;
            }
            return { height: targetHeight, width: targetWidth };
        };
        return Resize;
    }());
    curly.Resize = Resize;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var ResponsiveText = (function () {
        function ResponsiveText() {
        }
        ResponsiveText.layout = function () {
            if (curly.Window.width > 1600) {
                document.body.style.fontSize = "120%";
            }
            if (curly.Window.width <= 1600 && curly.Window.width > 1000) {
                document.body.style.fontSize = "110%";
            }
            if (curly.Window.width <= 1000 && curly.Window.width > 780) {
                document.body.style.fontSize = "100%";
            }
            if (curly.Window.width <= 780 && curly.Window.width > 400) {
                document.body.style.fontSize = "90%";
            }
            if (curly.Window.width <= 400) {
                document.body.style.fontSize = "80%";
            }
        };
        return ResponsiveText;
    }());
    curly.ResponsiveText = ResponsiveText;
})(curly || (curly = {}));
/// <reference path="Container.ts" />
var curly;
(function (curly) {
    var Select = (function (_super) {
        __extends(Select, _super);
        function Select(config) {
            var _this = this;
            config.type = "select";
            _super.call(this, config);
            var element = this.element;
            if (config.name) {
                element.name = config.name;
            }
            var options = config.options;
            options.map(function (option) {
                var item = new curly.Container({
                    text: option,
                    type: "option"
                });
                _this.addChild(item);
            });
        }
        Object.defineProperty(Select.prototype, "value", {
            get: function () {
                var element = this.element;
                return element.value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Select.prototype, "selectedIndex", {
            get: function () {
                var element = this.element;
                return element.selectedIndex;
            },
            enumerable: true,
            configurable: true
        });
        Select.CHANGE = "change";
        return Select;
    }(curly.Container));
    curly.Select = Select;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var Styles = (function () {
        function Styles() {
        }
        Styles.button = {
            fontSize: "1.2em",
            fontFamily: "sans-serif",
            fontWeight: "300",
            fontColourOver: 0x333333,
            fontColourOut: 0xffffff,
            letterSpacing: "0em",
            backgroundColor: "#f1f1f1",
            backgroundColorHover: "#dddddd",
            cornerRadius: "0.5em",
            durationOut: 1,
            durationIn: 0,
            padding: "0.5em",
            textAlign: "left",
            whiteSpace: "nowrap",
            msTouchAction: "manipulation",
            touchAction: "manipulation",
            cursor: "pointer",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            backgroundImage: "none",
            border: "1px solid transparent",
            borderColor: "#dddddd",
            color: "#333333",
            colorHover: "#ffffff",
            text: "button"
        };
        Styles.caret = {
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
            marginLeft: "0.35rem"
        };
        Styles.drop = {
            fontFamily: "sans-serif",
            fontSize: "1.2rem",
            backgroundColor: "#ffffff",
            backgroundColorHover: "#cccccc",
            colorHover: "#000000",
            color: "#000000",
            durationIn: 0,
            durationOut: 0.5,
            listStyle: "none",
            zIndex: "1000",
            position: "absolute",
            // float: "left",
            //!important to remove default margin on a ul
            marginTop: "0px",
            minWidth: "5rem",
            border: "1px solid rgba(0,0,0,.15)",
            webkitBoxShadow: "0 6px 12px rgba(0,0,0,.175)",
            boxShadow: "0px 6px 12px rgba(0,0,0,0.175)",
            fontWeight: "300",
            paddingLeft: "0px",
            durationExpand: "2",
            durationContract: "2"
        };
        return Styles;
    }());
    curly.Styles = Styles;
})(curly || (curly = {}));
/// <reference path="eventdispatcher.ts" />
var curly;
(function (curly) {
    var URLLoader = (function (_super) {
        __extends(URLLoader, _super);
        function URLLoader() {
            _super.call(this);
        }
        URLLoader.prototype.load = function (url, method, params, scope, headers, cache) {
            var _this = this;
            if (this.http) {
                this.http.abort();
            }
            else {
                this.http = new XMLHttpRequest();
            }
            this.http.open(method, url, true);
            this.http.timeout = 20000;
            //this.http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');  
            if (headers) {
                headers.map(function (header) {
                    _this.http.setRequestHeader(header.value, header.variable);
                });
            }
            //if (!cache) {
            //    this.http.setRequestHeader("If-Modified-Since", "Sat, 01 Jan 2005 00:00:00 GMT");
            //}
            this.http.onreadystatechange = this.handleResponse.bind(this);
            this.http.send(params);
        };
        URLLoader.prototype.concatParams = function (params) {
            var queryString = "?";
            for (var i in params) {
                if (params.hasOwnProperty(i)) {
                    queryString.concat(i, "=", params[i], "&");
                }
            }
            queryString = queryString.slice(0, -1);
            return queryString;
        };
        URLLoader.prototype.setRequestHeader = function (header) {
            this.http.setRequestHeader(header.value, header.variable);
        };
        URLLoader.prototype.handleResponse = function () {
            if (this.http.readyState === 4) {
                if (this.http.status === 200) {
                    var event_1 = new curly.Event(URLLoader.COMPLETE, this, this.http.responseText);
                    _super.prototype.dispatchEvent.call(this, event_1);
                    this.http.onreadystatechange = undefined;
                }
                else {
                    var error = void 0;
                    if (this.http.status === 0) {
                        error = "Network Error 0x2ee2";
                    }
                    else {
                        error = this.http.status.toString();
                    }
                    var event_2 = new curly.Event(URLLoader.ERROR, this, this.http.status);
                    _super.prototype.dispatchEvent.call(this, event_2);
                }
            }
        };
        URLLoader.COMPLETE = "COMPLETE";
        URLLoader.ERROR = "ERROR";
        URLLoader.GET = "GET";
        URLLoader.PUT = "PUT";
        URLLoader.POST = "POST";
        URLLoader.UPDATE = "UPDATE";
        return URLLoader;
    }(curly.EventDispatcher));
    curly.URLLoader = URLLoader;
})(curly || (curly = {}));
var curly;
(function (curly) {
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
    curly.Window = Window;
})(curly || (curly = {}));
/// <reference path="../container.ts" />
var curly;
(function (curly) {
    var DropDown = (function (_super) {
        __extends(DropDown, _super);
        function DropDown(config) {
            var _this = this;
            var buttonText = "Button";
            if (config.text) {
                buttonText = config.text;
            }
            config.text = undefined;
            config.position = "relative";
            _super.call(this, config);
            this.items = [];
            this.button = new curly.Button({
                style: curly.Styles.button,
                display: "block"
            });
            config.button.text = buttonText;
            this.button.update(config.button);
            var caret = new curly.Container({
                id: "drop-caret",
                style: curly.Styles.caret,
                pointerEvents: "none"
            });
            if (config.caret) {
                caret.style(config.caret);
            }
            this.button.addChild(caret);
            this.addChild(this.button);
            this.button.addEventListener(this, "mousedown", this.buttonClicked);
            this.unorderedList = new curly.Container({
                type: "ul",
                id: this.id
            });
            this.dropConfig = {};
            for (var i in curly.Styles.drop) {
                this.dropConfig[i] = curly.Styles.drop[i];
            }
            for (var i in config.drop) {
                this.dropConfig[i] = config.drop[i];
            }
            this.unorderedList.style(this.dropConfig);
            this.addChild(this.unorderedList);
            var count = 0;
            config.options.map(function (option) {
                var item = new curly.Container({
                    id: count.toString(),
                    type: "li"
                });
                _this.unorderedList.addChild(item);
                var anchor = new curly.Container({
                    id: count.toString(),
                    type: "a"
                });
                anchor.style({
                    display: "list-item",
                    position: "static",
                    color: _this.dropConfig.color,
                    paddingLeft: "0.5em",
                    paddingRight: "0px",
                    paddingBottom: "0.5em",
                    paddingTop: "0.5em",
                    cursor: "pointer"
                });
                _this.items.push(item);
                anchor.innerHtml = option;
                anchor.addEventListener(_this, "mouseover", _this.itemOver);
                anchor.addEventListener(_this, "mouseout", _this.itemOut);
                anchor.addEventListener(_this, "mousedown", _this.itemClicked);
                item.addChild(anchor);
                count++;
            });
            this.unorderedList.style({
                display: "none"
            });
            this.style(config);
        }
        DropDown.prototype.itemClicked = function (e) {
            var element = e.target;
            this.dispatchEvent(new curly.Event(DropDown.CHANGE, this, element.id));
            TweenMax.killTweensOf(this.unorderedList.element);
            this.unorderedList.alpha = 1;
            this.unorderedList.to(this.dropConfig.durationContract, {
                delay: 0.3,
                alpha: 0,
                onComplete: this.hideList,
                onCompleteScope: this
            });
        };
        DropDown.prototype.itemOver = function (e) {
            var element = e.target;
            element.to(this.dropConfig.durationIn, {
                backgroundColor: this.dropConfig.backgroundColorHover,
                color: this.dropConfig.colorHover
            });
        };
        DropDown.prototype.itemOut = function (e) {
            var element = e.target;
            element.to(this.dropConfig.durationOut, {
                backgroundColor: this.dropConfig.backgroundColor,
                color: this.dropConfig.color
            });
        };
        DropDown.prototype.buttonClicked = function (e) {
            var _this = this;
            TweenMax.killTweensOf(this.unorderedList.element);
            this.unorderedList.style({
                display: "block",
                alpha: 0,
                top: "0%"
            });
            this.unorderedList.to(this.dropConfig.durationExpand, { ease: Strong.easeOut, alpha: 1, top: "100%" });
            this.scopedEventHandler = function (g) { _this.closeDrop(g); };
            // ! Don't think this will work in IE8, need attachEvent or polyfill
            document.body.addEventListener("mousedown", this.scopedEventHandler, true);
            this.button.removeEventListener("mousedown", this.buttonClicked);
        };
        DropDown.prototype.closeDrop = function (e) {
            var _this = this;
            // ! Don't think this will work in IE8, need attachEvent or polyfill
            document.body.removeEventListener("mousedown", this.scopedEventHandler, true);
            TweenMax.delayedCall(0, (function () {
                _this.button.addEventListener(_this, "mousedown", _this.buttonClicked);
            }), null, this);
            this.unorderedList.to(this.dropConfig.durationContract, {
                alpha: 0,
                onComplete: this.hideList,
                onCompleteScope: this
            });
        };
        DropDown.prototype.hideList = function () {
            this.unorderedList.style({
                display: "none"
            });
        };
        DropDown.prototype.disable = function () {
            this.button.disable();
            this.button.removeEventListener(curly.Button.CLICK, this.buttonClicked);
        };
        DropDown.prototype.enable = function () {
            this.button.enable();
            this.button.addEventListener(this, curly.Button.CLICK, this.buttonClicked);
        };
        DropDown.CHANGE = "change";
        return DropDown;
    }(curly.Container));
    curly.DropDown = DropDown;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var stateMachine;
    (function (stateMachine) {
        var StateMachine = (function (_super) {
            __extends(StateMachine, _super);
            function StateMachine(config) {
                _super.call(this, {
                    id: config.id
                });
                this.views = {};
                this.currentState = "";
                this.config = config;
                this.style(config.style);
                this.style(config);
            }
            StateMachine.prototype.update = function (state) {
                if (state !== this.currentState) {
                    if (this.config.views[state]) {
                        this.currentState = state;
                        var to = {
                            top: "0px",
                            left: "0px",
                            duration: 0
                        };
                        var from = {
                            top: "0px",
                            left: "0px",
                            duration: 0
                        };
                        for (var i in this.config.to) {
                            to[i] = this.config.to[i];
                        }
                        for (var i in this.config.from) {
                            from[i] = this.config.from[i];
                        }
                        if (this.currentView) {
                            if (from.duration > 0) {
                                this.currentView.to(from.duration, { left: from.left, top: from.top, alpha: 0, onComplete: this.removeView, onCompleteScope: this, onCompleteParams: [this.currentView] });
                            }
                            else {
                                this.removeChild(this.currentView);
                            }
                        }
                        if (this.views[state]) {
                        }
                        else {
                            var view = new this.config.views[state]();
                            this.views[state] = view;
                        }
                        this.currentView = this.views[state];
                        if (this.currentView.hydrate) {
                            this.currentView.hydrate();
                        }
                        this.addChild(this.currentView);
                        this.currentView.style({
                            alpha: 0
                        });
                        if (to.duration > 0) {
                            this.currentView.to(to.duration, { left: to.left, top: to.top, alpha: 1, onComplete: function (view) { return view.style({ display: "block" }); }, onCompleteParams: [this.currentView] });
                        }
                        else {
                            this.currentView.style({
                                opacity: "1",
                                display: "block",
                                top: to.top,
                                left: to.left
                            });
                        }
                    }
                    else {
                        console.log("no view defined called: ", state);
                    }
                }
                else {
                    console.log("view already loaded: ", state);
                }
            };
            StateMachine.prototype.removeView = function (view) {
                this.removeChild(view);
            };
            return StateMachine;
        }(curly.Container));
        stateMachine.StateMachine = StateMachine;
    })(stateMachine = curly.stateMachine || (curly.stateMachine = {}));
})(curly || (curly = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlByb3BlcnRpZXMudHMiLCJFdmVudERpc3BhdGNoZXIudHMiLCJDb250YWluZXIudHMiLCJBbmNob3IudHMiLCJCdXR0b24udHMiLCJDaGVja0JveC50cyIsIkRpbWVuc2lvbnMudHMiLCJJbWFnZS50cyIsIk9ic2VydmVyLnRzIiwiUmVzaXplLnRzIiwiUmVzcG9uc2l2ZVRleHQudHMiLCJTZWxlY3QudHMiLCJTdHlsZXMudHMiLCJVUkxMb2FkZXIudHMiLCJXaW5kb3cudHMiLCJkcm9wRG93bi9Ecm9wRG93bi50cyIsInN0YXRlTWFjaGluZS9TdGF0ZU1hY2hpbmUudHMiLCJzdGF0ZU1hY2hpbmUvU3RhdGVNYWNoaW5lQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBTyxLQUFLLENBcUVYO0FBckVELFdBQU8sS0FBSyxFQUFDLENBQUM7SUFDVjtRQUFBO1FBbUVBLENBQUM7UUFsRVUsZ0JBQUssR0FBWixVQUFhLE1BQVcsRUFBRSxJQUFzQjtZQUM1QyxJQUFJLE9BQW9CLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzdCLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLENBQUM7WUFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsRUFBRSxDQUFDLENBQUMs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QUMsQ0FBQzt3QkFDN0ssQ0FBQzt3QkFDRCxJQUFJLENBQUMsQ0FBQzs0QkFDRixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztnQ0FDbkIsT0FBTyxFQUFFLEdBQUc7Z0NBQ1osT0FBTyxFQUFFLE9BQU87Z0NBQ2hCLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRztnQ0FDWCxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7NkJBQ2hCLENBQUMsQ0FBQzt3QkFDUCxDQUFDO29CQUNMLENBQUM7b0JBQ0QsSUFBSSxDQUFDLENBQUM7d0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDbkQsQ0FBQztnQkFDTCxDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2hELENBQUM7WUFDTCxDQUFDO1lBRU8saUNBQVUsR0FBbEIsVUFBbUIsSUFBZTtnQkFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQ0wsbUJBQUM7UUFBRCxDQXZGQSxBQXVGQyxDQXZGaUMsZUFBUyxHQXVGMUM7UUF2RlkseUJBQVksZUF1RnhCLENBQUE7SUFDTCxDQUFDLEVBekZhLFlBQVksR0FBWixrQkFBWSxLQUFaLGtCQUFZLFFBeUZ6QjtBQUNMLENBQUMsRUEzRk0sS0FBSyxLQUFMLEtBQUssUUEyRlg7QUN6RUEiLCJmaWxlIjoiY3VybHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgY3VybHkge1xyXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnRpZXMge1xyXG4gICAgICAgIHN0YXRpYyBzdHlsZShvYmplY3Q6IGFueSwgdmFyczogU3R5bGVEZWNsYXJhdGlvbikge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IG9iamVjdC5lbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IG9iamVjdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB2YXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogYW55ID0gdmFyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwieFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhcnNbaV0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwieVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhcnNbaV0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaGVpZ2h0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFyc1tpXS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3aWR0aFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhcnNbaV0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYmFja2dyb3VuZENvbG9yXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCByZWQgPSB2YXJzW2ldID4+IDE2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgZ3JlZW4gPSAodmFyc1tpXSA+PiA4KSAmIDI1NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGJsdWUgPSB2YXJzW2ldICYgMjU1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFwicmdiKFwiICsgKHZhcnNbaV0gPj4gMTYpICsgXCIsXCIgKyAoKHZhcnNbaV0gPj4gOCkgJiAyNTUpICsgXCIsXCIgKyAodmFyc1tpXSAmIDI1NSkgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbG9yXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gXCJyZ2IoXCIgKyAodmFyc1tpXSA+PiAxNikgKyBcIixcIiArICgodmFyc1tpXSA+PiA4KSAmIDI1NSkgKyBcIixcIiArICh2YXJzW2ldICYgMjU1KSArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlTmFtZTogc3RyaW5nID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInhcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlTmFtZSA9IFwibGVmdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZU5hbWUgPSBcInRvcFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhbHBoYVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVOYW1lID0gXCJvcGFjaXR5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtzdHlsZU5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBFdmVudERpc3BhdGNoZXIgKFR5cGVTY3JpcHQpXHJcbiAqIC0gU2ltcGxlIGV4dGVuZGFibGUgZXZlbnQgZGlzcGF0Y2hpbmcgY2xhc3NcclxuICpcclxuICogQHZlcnNpb24gMC4xLjVcclxuICogQGF1dGhvciBKb2huIFZyYmFuYWNcclxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2VcclxuICoqL1xyXG5cclxubW9kdWxlIGN1cmx5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBFdmVudCB7XHJcbiAgICAgICAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgX3RhcmdldDogYW55O1xyXG4gICAgICAgIHByaXZhdGUgX2RhdGE6IGFueTtcclxuICAgICAgICBwcml2YXRlIF9zb3VyY2VFdmVudDogYW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIHRhcmdldE9iajogYW55LCBkYXRhPzogYW55LCBzb3VyY2VFdmVudD86IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0T2JqO1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VyY2VFdmVudCA9IHNvdXJjZUV2ZW50O1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB0YXJnZXQoKTogQ29udGFpbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldFRhcmdldCgpOiBhbnkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgZ2V0IHR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgZGF0YSgpOiBhbnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBzb3VyY2VFdmVudCgpOiBhbnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlRXZlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xyXG4gICAgICAgIHByaXZhdGUgX2xpc3RlbmVyczogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgaGFzRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbik6IEJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgZXhpc3RzOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGlzdGVuZXJzW2ldLnR5cGUgPT09IHR5cGUgJiYgdGhpcy5fbGlzdGVuZXJzW2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4aXN0cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBleGlzdHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRFdmVudExpc3RlbmVyKHNjb3BlOiBhbnksIHR5cGVTdHI6IHN0cmluZywgbGlzdGVuZXJGdW5jOiBGdW5jdGlvbiwgZGF0YT86YW55LCB1c2VDYXB0dXJlID0gZmFsc2UsIHNjb3BlZEV2ZW50TGlzdGVuZXI6IEZ1bmN0aW9uID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0V2ZW50TGlzdGVuZXIodHlwZVN0ciwgbGlzdGVuZXJGdW5jKSkgeyBcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZVN0cixcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lckZ1bmMsXHJcbiAgICAgICAgICAgICAgICB1c2VDYXB0dXJlOiB1c2VDYXB0dXJlLFxyXG4gICAgICAgICAgICAgICAgc2NvcGVkRXZlbnRMaXN0ZW5lcjogc2NvcGVkRXZlbnRMaXN0ZW5lclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZVN0cjogc3RyaW5nLCBsaXN0ZW5lckZ1bmM6IEZ1bmN0aW9uKToge30ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSB0aGlzLl9saXN0ZW5lcnMuZmlsdGVyKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChpdGVtLnR5cGUgPT09IHR5cGVTdHIgJiYgaXRlbS5saXN0ZW5lci50b1N0cmluZygpID09PSBsaXN0ZW5lckZ1bmMudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzLmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoIShpdGVtLnR5cGUgPT09IHR5cGVTdHIgJiYgaXRlbS5saXN0ZW5lci50b1N0cmluZygpID09PSBsaXN0ZW5lckZ1bmMudG9TdHJpbmcoKSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lclswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpc3BhdGNoRXZlbnQoZXZ0OiBFdmVudCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2xpc3RlbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVyc1tpXS50eXBlID09PSBldnQudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tpXS5saXN0ZW5lci5jYWxsKHRoaXMuX2xpc3RlbmVyc1tpXS5zY29wZSwgZXZ0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJwcm9wZXJ0aWVzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkV2ZW50RGlzcGF0Y2hlci50c1wiIC8+XHJcblxyXG5cclxuLyoqXHJcbiAqIGN1cmx5LkNvbnRhaW5lciAoVHlwZVNjcmlwdClcclxuICogLSBDb250YWluZXJcclxuICpcclxuICogQHZlcnNpb24gMC4xLjVcclxuICogQGF1dGhvciBHYWJyaWVsIE1jQ2FsbGluXHJcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlXHJcbiAqKi9cclxuXHJcblxyXG5tb2R1bGUgY3VybHkge1xyXG4gICAgZXhwb3J0IGNsYXNzIENvbnRhaW5lciBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbmZpZz86IENvbnRhaW5lckNvbmZpZykge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5yb290KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChjb25maWcudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5pZCA9IGNvbmZpZy5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlubmVySHRtbCA9IGNvbmZpZy50ZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUoY29uZmlnLnN0eWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUoY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzZWVuIHNvbWUgaXNzdWVzIHdpdGggdGhlIGRlZmF1bHQgc3RhdGljXHJcbiAgICAgICAgICAgIC8vIHRoaXMuX2VsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgYWRkVG9Cb2R5KCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3R5bGUodmFyczogU3R5bGVEZWNsYXJhdGlvbikge1xyXG4gICAgICAgICAgICBQcm9wZXJ0aWVzLnN0eWxlKHRoaXMuX2VsZW1lbnQsIHZhcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xhc3NOYW1lKC4uLm5hbWVzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgICAgICBuYW1lcy5tYXAoKG5hbWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc05hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB9KSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZENoaWxkKGNoaWxkKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50ID0gY2hpbGQuZWxlbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudCA9IGNoaWxkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZEVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVtb3ZlQ2hpbGQoY2hpbGQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnQgPT09IGNoaWxkLmVsZW1lbnQucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZC5lbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG8oZHVyYXRpb246IG51bWJlciwgdmFyczogT2JqZWN0KTogVHdlZW5NYXgge1xyXG4gICAgICAgICAgICByZXR1cm4gVHdlZW5NYXgudG8odGhpcy5fZWxlbWVudCwgZHVyYXRpb24sIHZhcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnJvbVRvKGR1cmF0aW9uOiBudW1iZXIsIGZyb21WYXJzOiBPYmplY3QsIHRvVmFyczogT2JqZWN0KTogVHdlZW5NYXgge1xyXG4gICAgICAgICAgICByZXR1cm4gVHdlZW5NYXguZnJvbVRvKHRoaXMuX2VsZW1lbnQsIGR1cmF0aW9uLCBmcm9tVmFycywgdG9WYXJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZyb20oZHVyYXRpb246IG51bWJlciwgdmFyczogT2JqZWN0KTogVHdlZW5NYXgge1xyXG4gICAgICAgICAgICByZXR1cm4gVHdlZW5NYXguZnJvbSh0aGlzLl9lbGVtZW50LCBkdXJhdGlvbiwgdmFycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRFdmVudExpc3RlbmVyKHNjb3BlOiBhbnksIHR5cGVTdHI6IHN0cmluZywgbGlzdGVuZXJGdW5jOiBGdW5jdGlvbiwgZGF0YT86YW55LCB1c2VDYXB0dXJlID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgc2NvcGVkRXZlbnRMaXN0ZW5lcjogRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNhcHR1cmVkIGF0IGFkZFwiLCBlKTsgXHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lckZ1bmMuYXBwbHkoc2NvcGUsIFtuZXcgY3VybHkuRXZlbnQodHlwZVN0ciwgdGhhdCwgZGF0YSwgZSldKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHN1cGVyLmFkZEV2ZW50TGlzdGVuZXIoc2NvcGUsIHR5cGVTdHIsIGxpc3RlbmVyRnVuYywgdXNlQ2FwdHVyZSwgZGF0YSwgIHNjb3BlZEV2ZW50TGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIHRvIGVsZW1lbnQgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3gsIEdvb2dsZSBDaHJvbWUgYW5kIFNhZmFyaSAoYW5kIE9wZXJhIGFuZCBJbnRlcm5ldCBFeHBsb3JlciBmcm9tXHJcbiAgICAgICAgICAgICAgICAvLyB2ZXJzaW9uIDkpLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGVTdHIsIHNjb3BlZEV2ZW50TGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2VsZW1lbnRbXCJhdHRhY2hFdmVudFwiXSkge1xyXG4gICAgICAgICAgICAgICAgLy8gT3BlcmEgYW5kIEV4cGxvcmVyICh2ZXJzaW9uIDwgOSkuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50W1wiYXR0YWNoRXZlbnRcIl0oJ29uJyArIHR5cGVTdHIsIHNjb3BlZEV2ZW50TGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRbXCJhdHRhY2hFdmVudFwiXShcIm9ucHJvcGVydHljaGFuZ2VcIiwgZnVuY3Rpb24gKGU6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmV2ZW50VHlwZSA9PT0gdHlwZVN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5kYXRhID0gZS5jdXN0b21EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZWRFdmVudExpc3RlbmVyKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGVTdHI6IHN0cmluZywgbGlzdGVuZXJGdW5jOiBGdW5jdGlvbik6IHt9IHtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVyOiBhbnkgPSBzdXBlci5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGVTdHIsIGxpc3RlbmVyRnVuYyk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94LCBHb29nbGUgQ2hyb21lIGFuZCBTYWZhcmkgKGFuZCBPcGVyYSBhbmQgSW50ZXJuZXQgRXhwbG9yZXIgZnJvbVxyXG4gICAgICAgICAgICAgICAgLy8gdmVyc2lvbiA5KS5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlU3RyLCBsaXN0ZW5lci5zY29wZWRFdmVudExpc3RlbmVyLCBsaXN0ZW5lci51c2VDYXB0dXJlKTtcclxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2VsZW1lbnRbXCJkZXRhY2hFdmVudFwiXSkge1xyXG4gICAgICAgICAgICAgICAgLy8gT3BlcmEgYW5kIEV4cGxvcmVyICh2ZXJzaW9uIDwgOSkuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50W1wiZGV0YWNoRXZlbnRcIl0oJ29uJyArIHR5cGVTdHIsIDxFdmVudExpc3RlbmVyPmxpc3RlbmVyRnVuYyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCA/IGUucHJldmVudERlZmF1bHQoKSA6IGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB3aWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFkb3coKS53aWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCB3aWR0aCh3OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgUHJvcGVydGllcy5zdHlsZSh0aGlzLl9lbGVtZW50LCB7IHdpZHRoOiB3IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFkb3coKS5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgaGVpZ2h0KGg6IG51bWJlcikge1xyXG4gICAgICAgICAgICBQcm9wZXJ0aWVzLnN0eWxlKHRoaXMuX2VsZW1lbnQsIHsgaGVpZ2h0OiBoIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHkoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHgoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQub2Zmc2V0TGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCB5KHlQb3M6IG51bWJlcikge1xyXG4gICAgICAgICAgICBQcm9wZXJ0aWVzLnN0eWxlKHRoaXMuX2VsZW1lbnQsIHsgeTogeVBvcyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCB4KHhQb3M6IG51bWJlcikge1xyXG4gICAgICAgICAgICBQcm9wZXJ0aWVzLnN0eWxlKHRoaXMuX2VsZW1lbnQsIHsgeDogeFBvcyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBhbHBoYSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLl9lbGVtZW50LnN0eWxlLm9wYWNpdHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGFscGhhKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgUHJvcGVydGllcy5zdHlsZSh0aGlzLl9lbGVtZW50LCB7IG9wYWNpdHk6IHZhbHVlLnRvU3RyaW5nKCkgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoaWRlKCkge1xyXG4gICAgICAgICAgICBQcm9wZXJ0aWVzLnN0eWxlKHRoaXMuX2VsZW1lbnQsIHsgZGlzcGxheTogXCJub25lXCIgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93KCkge1xyXG4gICAgICAgICAgICBQcm9wZXJ0aWVzLnN0eWxlKHRoaXMuX2VsZW1lbnQsIHsgZGlzcGxheTogXCJibG9ja1wiIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlsbENvbnRhaW5lcigpIHtcclxuICAgICAgICAgICAgUHJvcGVydGllcy5zdHlsZSh0aGlzLl9lbGVtZW50LCB7XHJcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogXCI1MCVcIixcclxuICAgICAgICAgICAgICAgIHRvcDogXCI1MCVcIixcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoLTUwJSwgLTUwJSlcIixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjZW50cmVIb3Jpem9udGFsKCkge1xyXG4gICAgICAgICAgICBQcm9wZXJ0aWVzLnN0eWxlKHRoaXMuX2VsZW1lbnQsIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIixcclxuICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNlbnRyZUhvcml6b250YWxUZXh0KCkge1xyXG4gICAgICAgICAgICBQcm9wZXJ0aWVzLnN0eWxlKHRoaXMuX2VsZW1lbnQsIHtcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgLy8gd2lkdGg6IFwiMTAwJVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFkb3coKTogRGltZW5zaW9ucyB7XHJcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuYm9keS5jb250YWlucyh0aGlzLl9lbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuX2VsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRpbWVuc2lvbnMgPSB0aGlzLmRpbWVuc2lvbnNQb2x5ZmlsbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpbWVuc2lvbnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGltZW5zaW9uc1BvbHlmaWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRpbWVuc2lvbnNQb2x5ZmlsbCgpOiBjdXJseS5EaW1lbnNpb25zIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuICAgICAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5fZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICAgICAgICAgICAgLy8gd2lkdGggPSB0aGlzLl9lbGVtZW50LnNjcm9sbFdpZHRoO1xyXG4gICAgICAgICAgICAvLyBoZWlnaHQgPSB0aGlzLl9lbGVtZW50LnNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aWR0aCAmJiBoZWlnaHQpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGZhbGxiYWNrIHRvIHNjcm9sbHdpZHRoIGFuZCBzY3JvbGxoZWlnaHRcclxuICAgICAgICAgICAgICAgIHdpZHRoID0gdGhpcy5fZWxlbWVudC5zY3JvbGxXaWR0aDtcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuX2VsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGRpbWVuc2lvbnMgPSBuZXcgRGltZW5zaW9ucyh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRpbWVuc2lvbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IGlucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuX2VsZW1lbnQ7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dEVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQuaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgaWQoaWRlbnRpZmllcjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuaWQgPSBpZGVudGlmaWVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBpbm5lckh0bWwoaHRtbDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpbm5lckh0bWwoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGhyZWYobGluazogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gPEhUTUxBbmNob3JFbGVtZW50PnRoaXMuX2VsZW1lbnQ7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaHJlZiA9IGxpbms7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaHJlZigpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IDxIVE1MQW5jaG9yRWxlbWVudD50aGlzLl9lbGVtZW50O1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5ocmVmO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNvbnRhaW5lci50c1wiIC8+XHJcblxyXG5tb2R1bGUgY3VybHkge1xyXG4gICAgZXhwb3J0IGNsYXNzIEFuY2hvciBleHRlbmRzIENvbnRhaW5lciB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbmZpZzpBbmNob3JDb25maWcpIHtcclxuICAgICAgICAgICAgY29uZmlnLnR5cGUgPSBcImFcIjtcclxuICAgICAgICAgICAgc3VwZXIoY29uZmlnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gPEhUTUxBbmNob3JFbGVtZW50PnRoaXMuZWxlbWVudDtcclxuICAgICAgICAgICAgZWxlbWVudC5ocmVmID0gY29uZmlnLmhyZWY7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb250YWluZXIudHNcIiAvPlxyXG5tb2R1bGUgY3VybHkge1xyXG4gICAgZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIENvbnRhaW5lciB7XHJcbiAgICAgICAgc3RhdGljIENMSUNLOiBzdHJpbmcgPSBcImNsaWNrXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVkOiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBCdXR0b25Db25maWc7XHJcbiAgICAgICAgcHJpdmF0ZSBpY29uOiBDb250YWluZXI7XHJcblxyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb25maWc6IEJ1dHRvbkNvbmZpZykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZTogc3RyaW5nO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnLmhyZWYpIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBcImFcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgICAgIGlkOiBjb25maWcuaWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlOiBTdHlsZXMuYnV0dG9uXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ocmVmID0gY29uZmlnLmhyZWY7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnLmljb24gJiYgY29uZmlnLmljb24uY29kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uID0gbmV3IENvbnRhaW5lcih7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzcGFuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogY29uZmlnLmljb24uY29kZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGUoY29uZmlnOiBCdXR0b25Db25maWcpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcgPSB7fTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuc3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gY29uZmlnLnN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWdbaV0gPSBjb25maWcuc3R5bGVbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ1tpXSA9IGNvbmZpZ1tpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5zdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBjb25maWcuc3R5bGUuaWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmljb25baV0gPSBjb25maWcuc3R5bGUuaWNvbltpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbm5lckh0bWwgPSBjb25maWcudGV4dDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLCBcIm1vdXNlb3ZlclwiLCB0aGlzLm92ZXJXaXRoRW5hYmxlKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHRoaXMsIFwibW91c2VvdXRcIiwgdGhpcy5vdXRXaXRoRW5hYmxlKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuaWNvbiAmJiB0aGlzLmNvbmZpZy5pY29uLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5pY29uLmFsaWduID09PSBcImxlZnRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvbi5zdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogdGhpcy5jb25maWcuaWNvbi5wYWRkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uLnN0eWxlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IHRoaXMuY29uZmlnLmljb24ucGFkZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uLnN0eWxlKHtcclxuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGlzLmNvbmZpZy5pY29uLmZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IHRoaXMuY29uZmlnLmljb24uZm9udFNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQ6IHRoaXMuY29uZmlnLmljb24uYWxpZ24sXHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogXCJub25lXCJcclxuICAgICAgICAgICAgICAgIH0pOyBcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuaWNvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5pY29uLnN0eWxlKHtcclxuICAgICAgICAgICAgICAgIC8vIHBhZGRpbmdMZWZ0OiBcIjAuNWVtXCIsXHJcbiAgICAgICAgICAgICAgICAvLyBwYWRkaW5nUmlnaHQ6IFwiMC41ZW1cIixcclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vYW55dGhpbmcgZWxzZSBpbiB0aGUgY29uZmlnXHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUodGhpcy5jb25maWcpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBvdmVyKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvKHRoaXMuY29uZmlnLmR1cmF0aW9uSW4sIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5jb25maWcuYmFja2dyb3VuZENvbG9ySG92ZXIsXHJcbiAgICAgICAgICAgICAgICAvLyBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmMDAwMFwiLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29uZmlnLmNvbG9ySG92ZXIgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG91dCgpIHtcclxuICAgICAgICAgICAgdGhpcy50byh0aGlzLmNvbmZpZy5kdXJhdGlvbk91dCwge1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmNvbmZpZy5iYWNrZ3JvdW5kQ29sb3IsICAgXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb25maWcuY29sb3JcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgY2xpY2soZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMub3V0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgY3VybHkuRXZlbnQoQnV0dG9uLkNMSUNLLCB0aGlzLCBlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlKHsgY3Vyc29yOiBcImRlZmF1bHRcIiB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUoeyBjdXJzb3I6IFwiZGVmYXVsdFwiIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZW5hYmxlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlKHsgY3Vyc29yOiBcInBvaW50ZXJcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5vdXQoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IGRhdGEoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmRhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvdmVyV2l0aEVuYWJsZShlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG91dFdpdGhFbmFibGUoZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cImNvbnRhaW5lci50c1wiIC8+XHJcbm1vZHVsZSBjdXJseSB7XHJcbiAgICBleHBvcnQgY2xhc3MgQ2hlY2tCb3ggZXh0ZW5kcyBDb250YWluZXIge1xyXG4gICAgICAgIHN0YXRpYyBDTElDSzogc3RyaW5nID0gXCJjbGlja1wiO1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlZDogYm9vbGVhbjtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbmZpZz86IENoZWNrQm94Q29uZmlnKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaW5wdXRcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5lbGVtZW50O1xyXG4gICAgICAgICAgICBlbGVtZW50LnR5cGUgPSBcImNoZWNrYm94XCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZCA9IGNvbmZpZy5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUoY29uZmlnLnN0eWxlKTtcclxuICAgICAgICAgICAgICAgIC8vYW55dGhpbmcgZWxzZSBpbiB0aGUgY29uZmlnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlKGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jaGVja2VkID0gY29uZmlnLmNoZWNrZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBjaGVja2VkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZWxlbWVudDtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2hlY2tlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgY3VybHkge1xyXG4gICAgZXhwb3J0IGNsYXNzIERpbWVuc2lvbnMge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB3aWR0aDogbnVtYmVyLCBwdWJsaWMgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG59IiwibW9kdWxlIGN1cmx5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBJbWFnZSBleHRlbmRzIENvbnRhaW5lciB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbmZpZzpJbWFnZUNvbmZpZykge1xyXG4gICAgICAgICAgICBjb25maWcudHlwZSA9IFwiaW1nXCI7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbmZpZyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmxvYWQoY29uZmlnLnBhdGgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5hZGRFdmVudExpc3RlbmVyKHRoaXMsIFwibG9hZFwiLCB0aGlzLmxvYWRlZCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLCBcImVycm9yXCIsIHRoaXMuZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9hZChwYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCBwYXRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHByaXZhdGUgbG9hZGVkKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwicGljdHVyZSBsb2FkZWQ6IFwiLCBlKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIHByaXZhdGUgZXJyb3IoZTogRXZlbnQpIHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgY3VybHkge1xyXG4gICAgZXhwb3J0IGNsYXNzIE9ic2VydmVyIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBvYnNlcnZlcnMgPSB7fTtcclxuXHJcbiAgICAgICAgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXIoc2NvcGU6IGFueSwgdHlwZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm9ic2VydmVyc1t0eXBlXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNbdHlwZV0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFERElORyBPQlNFUlZFUjogXCIsIHR5cGUpO1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyc1t0eXBlXS5wdXNoKHsgc2NvcGU6IHNjb3BlLCB0eXBlOiB0eXBlLCBjYWxsYmFjazogY2FsbGJhY2sgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgc3RhdGljIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4T2ZDbG9zdXJlVG9SZW1vdmU7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vYnNlcnZlcnNbdHlwZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9ic2VydmVyc1t0eXBlXS5jYWxsYmFjayA9PT0gY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mQ2xvc3VyZVRvUmVtb3ZlID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFTU9WSU5HIE9CU0VSVkVSOiBcIiwgdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzW3R5cGVdLnNwbGljZShpbmRleE9mQ2xvc3VyZVRvUmVtb3ZlLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBkaXNwYXRjaEV2ZW50KGV2dDogY3VybHkuRXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBldnQudHlwZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub2JzZXJ2ZXJzW3R5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub2JzZXJ2ZXJzW3R5cGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNbdHlwZV1baV0uY2FsbGJhY2suY2FsbCh0aGlzLm9ic2VydmVyc1t0eXBlXVtpXS5zY29wZSwgZXZ0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRElTUEFUQ0ggRVJST1I6IE5PIE9CU0VSVkVSIFJFR0lTVEVSRURcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuICIsIm1vZHVsZSBjdXJseSB7XHJcbiAgICBleHBvcnQgY2xhc3MgUmVzaXplIHtcclxuXHJcbiAgICAgICAgc3RhdGljIHByb3BvcnRpb25hbE91dHNpZGUoXHJcbiAgICAgICAgICAgIG9iamVjdFdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgICAgIG9iamVjdEhlaWdodDpudW1iZXIsXHJcbiAgICAgICAgICAgIGFyZWFXaWR0aDogbnVtYmVyLFxyXG4gICAgICAgICAgICBhcmVhSGVpZ2h0OiBudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmF0aW86IG51bWJlciA9IG9iamVjdFdpZHRoIC8gb2JqZWN0SGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0V2lkdGg6IG51bWJlciA9IGFyZWFXaWR0aDtcclxuICAgICAgICAgICAgdmFyIHRhcmdldEhlaWdodDogbnVtYmVyID0gYXJlYVdpZHRoIC8gcmF0aW87XHJcblxyXG4vL1xyXG5cclxuICAgICAgICAgICAgaWYgKHRhcmdldEhlaWdodCA8IGFyZWFIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldEhlaWdodCA9IGFyZWFIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRXaWR0aCA9IHRhcmdldEhlaWdodCAqIHJhdGlvO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geyBoZWlnaHQ6IHRhcmdldEhlaWdodCwgd2lkdGg6IHRhcmdldFdpZHRoIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgcHJvcG9ydGlvbmFsSW5zaWRlKFxyXG4gICAgICAgICAgICBvYmplY3RXaWR0aDogbnVtYmVyLFxyXG4gICAgICAgICAgICBvYmplY3RIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgYXJlYVdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgICAgIGFyZWFIZWlnaHQ6IG51bWJlcik6T2JqZWN0IHtcclxuICAgICAgICAgICAgdmFyIHJhdGlvOiBudW1iZXIgPSBvYmplY3RXaWR0aCAvIG9iamVjdEhlaWdodDtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFdpZHRoOiBudW1iZXIgPSBhcmVhV2lkdGg7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRIZWlnaHQ6IG51bWJlciA9IGFyZWFXaWR0aCAqIHJhdGlvO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0SGVpZ2h0ID4gYXJlYUhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SGVpZ2h0ID0gYXJlYUhlaWdodDtcclxuICAgICAgICAgICAgICAgIHRhcmdldFdpZHRoID0gdGFyZ2V0SGVpZ2h0ICogcmF0aW87XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7IGhlaWdodDogdGFyZ2V0SGVpZ2h0LCB3aWR0aDogdGFyZ2V0V2lkdGggfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgY3VybHkge1xyXG4gICAgZXhwb3J0IGNsYXNzIFJlc3BvbnNpdmVUZXh0IHtcclxuXHJcbiAgICAgICAgc3RhdGljIGxheW91dCgpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGN1cmx5LldpbmRvdy53aWR0aCA+IDE2MDApe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9IFwiMTIwJVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGN1cmx5LldpbmRvdy53aWR0aCA8PSAxNjAwICYmIGN1cmx5LldpbmRvdy53aWR0aCA+IDEwMDApe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9IFwiMTEwJVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGN1cmx5LldpbmRvdy53aWR0aCA8PSAxMDAwICYmIGN1cmx5LldpbmRvdy53aWR0aCA+IDc4MCl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRTaXplID0gXCIxMDAlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY3VybHkuV2luZG93LndpZHRoIDw9IDc4MCAmJiBjdXJseS5XaW5kb3cud2lkdGggPiA0MDApe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9IFwiOTAlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY3VybHkuV2luZG93LndpZHRoIDw9IDQwMCl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRTaXplID0gXCI4MCVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJDb250YWluZXIudHNcIiAvPlxyXG5cclxubW9kdWxlIGN1cmx5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTZWxlY3QgZXh0ZW5kcyBDb250YWluZXIge1xyXG4gICAgICAgIHN0YXRpYyBDSEFOR0UgPSBcImNoYW5nZVwiO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb25maWc6IFNlbGVjdENvbmZpZykge1xyXG4gICAgICAgICAgICBjb25maWcudHlwZSA9IFwic2VsZWN0XCI7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IDxIVE1MU2VsZWN0RWxlbWVudD50aGlzLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmIChjb25maWcubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5uYW1lID0gY29uZmlnLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IGNvbmZpZy5vcHRpb25zO1xyXG4gICAgICAgICAgICBvcHRpb25zLm1hcCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBjdXJseS5Db250YWluZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IG9wdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm9wdGlvblwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gPEhUTUxTZWxlY3RFbGVtZW50PnRoaXMuZWxlbWVudDtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+dGhpcy5lbGVtZW50O1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwibW9kdWxlIGN1cmx5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBTdHlsZXMge1xyXG4gICAgICAgIHN0YXRpYyBidXR0b24gPSB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiBcIjEuMmVtXCIsXHJcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IFwic2Fucy1zZXJpZlwiLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiBcIjMwMFwiLFxyXG4gICAgICAgICAgICBmb250Q29sb3VyT3ZlcjogMHgzMzMzMzMsXHJcbiAgICAgICAgICAgIGZvbnRDb2xvdXJPdXQ6IDB4ZmZmZmZmLFxyXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBcIjBlbVwiLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2YxZjFmMVwiLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3JIb3ZlcjogXCIjZGRkZGRkXCIsXHJcbiAgICAgICAgICAgIGNvcm5lclJhZGl1czogXCIwLjVlbVwiLFxyXG4gICAgICAgICAgICBkdXJhdGlvbk91dDogMSxcclxuICAgICAgICAgICAgZHVyYXRpb25JbjogMCxcclxuICAgICAgICAgICAgcGFkZGluZzogXCIwLjVlbVwiLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246IFwibGVmdFwiLFxyXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiLFxyXG4gICAgICAgICAgICBtc1RvdWNoQWN0aW9uOiBcIm1hbmlwdWxhdGlvblwiLFxyXG4gICAgICAgICAgICB0b3VjaEFjdGlvbjogXCJtYW5pcHVsYXRpb25cIixcclxuICAgICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIixcclxuICAgICAgICAgICAgd2Via2l0VXNlclNlbGVjdDogXCJub25lXCIsXHJcbiAgICAgICAgICAgIG1velVzZXJTZWxlY3Q6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBtc1VzZXJTZWxlY3Q6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICB1c2VyU2VsZWN0OiBcIm5vbmVcIixcclxuICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCB0cmFuc3BhcmVudFwiLFxyXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogXCIjZGRkZGRkXCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcIiMzMzMzMzNcIixcclxuICAgICAgICAgICAgY29sb3JIb3ZlcjogXCIjZmZmZmZmXCIsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiYnV0dG9uXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN0YXRpYyBjYXJldCA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IFwiMHB4XCIsXHJcbiAgICAgICAgICAgIGhlaWdodDogXCIwcHhcIixcclxuICAgICAgICAgICAgYm9yZGVyTGVmdFdpZHRoOiBcIjAuMzVyZW1cIixcclxuICAgICAgICAgICAgYm9yZGVyTGVmdFN0eWxlOiBcInNvbGlkXCIsXHJcbiAgICAgICAgICAgIGJvcmRlckxlZnRDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxyXG4gICAgICAgICAgICBib3JkZXJSaWdodFdpZHRoOiBcIjAuMzVyZW1cIixcclxuICAgICAgICAgICAgYm9yZGVyUmlnaHRTdHlsZTogXCJzb2xpZFwiLFxyXG4gICAgICAgICAgICBib3JkZXJSaWdodENvbG9yOiBcInRyYW5zcGFyZW50XCIsXHJcbiAgICAgICAgICAgIGJvcmRlclRvcFdpZHRoOiBcIjAuMzVyZW1cIixcclxuICAgICAgICAgICAgYm9yZGVyVG9wU3R5bGU6IFwic29saWRcIixcclxuICAgICAgICAgICAgYm9yZGVyVG9wQ29sb3I6IFwiYmxhY2tcIixcclxuICAgICAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcclxuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogXCJtaWRkbGVcIixcclxuICAgICAgICAgICAgbWFyZ2luTGVmdDogXCIwLjM1cmVtXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN0YXRpYyBkcm9wID0geyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb250RmFtaWx5OiBcInNhbnMtc2VyaWZcIixcclxuICAgICAgICAgICAgZm9udFNpemU6IFwiMS4ycmVtXCIsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZmZmZmZmXCIsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvckhvdmVyOiBcIiNjY2NjY2NcIixcclxuICAgICAgICAgICAgY29sb3JIb3ZlcjogXCIjMDAwMDAwXCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcIiMwMDAwMDBcIixcclxuICAgICAgICAgICAgZHVyYXRpb25JbjogMCxcclxuICAgICAgICAgICAgZHVyYXRpb25PdXQ6IDAuNSxcclxuICAgICAgICAgICAgbGlzdFN0eWxlOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgekluZGV4OiBcIjEwMDBcIixcclxuICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcclxuICAgICAgICAgICAgLy8gZmxvYXQ6IFwibGVmdFwiLFxyXG4gICAgICAgICAgICAvLyFpbXBvcnRhbnQgdG8gcmVtb3ZlIGRlZmF1bHQgbWFyZ2luIG9uIGEgdWxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjBweFwiLFxyXG4gICAgICAgICAgICBtaW5XaWR0aDogXCI1cmVtXCIsXHJcbiAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgcmdiYSgwLDAsMCwuMTUpXCIsXHJcbiAgICAgICAgICAgIHdlYmtpdEJveFNoYWRvdzogXCIwIDZweCAxMnB4IHJnYmEoMCwwLDAsLjE3NSlcIixcclxuICAgICAgICAgICAgYm94U2hhZG93OiBcIjBweCA2cHggMTJweCByZ2JhKDAsMCwwLDAuMTc1KVwiLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiBcIjMwMFwiLFxyXG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogXCIwcHhcIixcclxuICAgICAgICAgICAgZHVyYXRpb25FeHBhbmQ6IFwiMlwiLFxyXG4gICAgICAgICAgICBkdXJhdGlvbkNvbnRyYWN0OiBcIjJcIlxyXG5cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiZXZlbnRkaXNwYXRjaGVyLnRzXCIgLz5cclxubW9kdWxlIGN1cmx5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBVUkxMb2FkZXIgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xyXG4gICAgICAgIHN0YXRpYyBDT01QTEVURTogc3RyaW5nID0gXCJDT01QTEVURVwiO1xyXG4gICAgICAgIHN0YXRpYyBFUlJPUjogc3RyaW5nID0gXCJFUlJPUlwiO1xyXG4gICAgICAgIHN0YXRpYyBHRVQ6IHN0cmluZyA9IFwiR0VUXCI7XHJcbiAgICAgICAgc3RhdGljIFBVVDogc3RyaW5nID0gXCJQVVRcIjtcclxuICAgICAgICBzdGF0aWMgUE9TVDogc3RyaW5nID0gXCJQT1NUXCI7XHJcbiAgICAgICAgc3RhdGljIFVQREFURTogc3RyaW5nID0gXCJVUERBVEVcIjtcclxuICAgICAgICBwcml2YXRlIGh0dHA6IFhNTEh0dHBSZXF1ZXN0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbG9hZCh1cmw6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55LCBzY29wZTogYW55LCBoZWFkZXJzPzogQXJyYXk8YW55PiwgY2FjaGU/OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmh0dHApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHR0cC5hYm9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5odHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5odHRwLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmh0dHAudGltZW91dCA9IDIwMDAwO1xyXG4gICAgICAgICAgICAvL3RoaXMuaHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ1hNTEh0dHBSZXF1ZXN0Jyk7ICBcclxuICAgICAgICAgICAgaWYgKGhlYWRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnMubWFwKGhlYWRlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLnZhbHVlLCBoZWFkZXIudmFyaWFibGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vaWYgKCFjYWNoZSkge1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzLmh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIklmLU1vZGlmaWVkLVNpbmNlXCIsIFwiU2F0LCAwMSBKYW4gMjAwNSAwMDowMDowMCBHTVRcIik7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5odHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHRoaXMuaGFuZGxlUmVzcG9uc2UuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5odHRwLnNlbmQocGFyYW1zKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNvbmNhdFBhcmFtcyhwYXJhbXM6IHt9KTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IHF1ZXJ5U3RyaW5nOiBzdHJpbmcgPSBcIj9cIjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeVN0cmluZy5jb25jYXQoaSwgXCI9XCIsIHBhcmFtc1tpXSwgXCImXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmcuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICByZXR1cm4gcXVlcnlTdHJpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldFJlcXVlc3RIZWFkZXIoaGVhZGVyOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5odHRwLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLnZhbHVlLCBoZWFkZXIudmFyaWFibGUpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgaGFuZGxlUmVzcG9uc2UoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmh0dHAucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaHR0cC5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBldmVudDogRXZlbnQgPSBuZXcgRXZlbnQoVVJMTG9hZGVyLkNPTVBMRVRFLCB0aGlzLCB0aGlzLmh0dHAucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnJvcjogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmh0dHAuc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJOZXR3b3JrIEVycm9yIDB4MmVlMlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSB0aGlzLmh0dHAuc3RhdHVzLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBldmVudDogRXZlbnQgPSBuZXcgRXZlbnQoVVJMTG9hZGVyLkVSUk9SLCB0aGlzLCB0aGlzLmh0dHAuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZSBjdXJseSB7XHJcbiAgICBleHBvcnQgY2xhc3MgV2luZG93IHtcclxuICAgICAgICBzdGF0aWMgc2Nyb2xsWSgpIHtcclxuICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cucGFnZVlPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3AgPSAoZG9jdW1lbnQuYm9keS5wYXJlbnRFbGVtZW50KSA/IGRvY3VtZW50LmJvZHkucGFyZW50RWxlbWVudC5zY3JvbGxUb3AgOiAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2Nyb2xsVG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHNjcm9sbFgoKSB7XHJcbiAgICAgICAgICAgIHZhciBzY3JvbGxMZWZ0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsTGVmdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LnBhZ2VYT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbExlZnQgPSAoZG9jdW1lbnQuYm9keS5wYXJlbnRFbGVtZW50KSA/IGRvY3VtZW50LmJvZHkucGFyZW50RWxlbWVudC5zY3JvbGxMZWZ0IDogMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNjcm9sbExlZnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IGhlaWdodCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgICAgICAgICAgICAgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxyXG4gICAgICAgICAgICAgICAgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IHdpZHRoKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGhcclxuICAgICAgICAgICAgICAgIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgICAgICAgICAgICAgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29udGFpbmVyLnRzXCIgLz5cclxubW9kdWxlIGN1cmx5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBEcm9wRG93biBleHRlbmRzIENvbnRhaW5lciB7XHJcbiAgICAgICAgc3RhdGljIENIQU5HRSA9IFwiY2hhbmdlXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBidXR0b246IEJ1dHRvbjtcclxuICAgICAgICBwcml2YXRlIHVub3JkZXJlZExpc3Q6IENvbnRhaW5lcjtcclxuICAgICAgICBwcml2YXRlIHNjb3BlZEV2ZW50SGFuZGxlcjogRXZlbnRMaXN0ZW5lcjtcclxuICAgICAgICBwcml2YXRlIGl0ZW1zOiBDb250YWluZXJbXTtcclxuICAgICAgICBwcml2YXRlIGRyb3BDb25maWc6IERyb3BDb25maWc7XHJcblxyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb25maWc6IERyb3BEb3duQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGxldCBidXR0b25UZXh0ID0gXCJCdXR0b25cIjtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZy50ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b25UZXh0ID0gY29uZmlnLnRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uZmlnLnRleHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcclxuXHJcbiAgICAgICAgICAgIHN1cGVyKGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IG5ldyBCdXR0b24oe1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6IFN0eWxlcy5idXR0b24sXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25maWcuYnV0dG9uLnRleHQgPSBidXR0b25UZXh0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5idXR0b24udXBkYXRlKGNvbmZpZy5idXR0b24pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNhcmV0ID0gbmV3IGN1cmx5LkNvbnRhaW5lcih7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJkcm9wLWNhcmV0XCIsXHJcbiAgICAgICAgICAgICAgICBzdHlsZTogU3R5bGVzLmNhcmV0LFxyXG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogXCJub25lXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnLmNhcmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjYXJldC5zdHlsZShjb25maWcuY2FyZXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hZGRDaGlsZChjYXJldCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuYnV0dG9uKTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcih0aGlzLCBcIm1vdXNlZG93blwiLCB0aGlzLmJ1dHRvbkNsaWNrZWQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51bm9yZGVyZWRMaXN0ID0gbmV3IENvbnRhaW5lcih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInVsXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5pZFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJvcENvbmZpZyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBTdHlsZXMuZHJvcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wQ29uZmlnW2ldID0gU3R5bGVzLmRyb3BbaV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gY29uZmlnLmRyb3ApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcENvbmZpZ1tpXSA9IGNvbmZpZy5kcm9wW2ldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVub3JkZXJlZExpc3Quc3R5bGUodGhpcy5kcm9wQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy51bm9yZGVyZWRMaXN0KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICBjb25maWcub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBuZXcgQ29udGFpbmVyKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogY291bnQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImxpXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bm9yZGVyZWRMaXN0LmFkZENoaWxkKGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBhbmNob3IgPSBuZXcgQ29udGFpbmVyKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogY291bnQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImFcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBhbmNob3Iuc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwibGlzdC1pdGVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuZHJvcENvbmZpZy5jb2xvcixcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogXCIwLjVlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogXCIwcHhcIixcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nQm90dG9tOiBcIjAuNWVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogXCIwLjVlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhbmNob3IuaW5uZXJIdG1sID0gb3B0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKHRoaXMsIFwibW91c2VvdmVyXCIsIHRoaXMuaXRlbU92ZXIpO1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIodGhpcywgXCJtb3VzZW91dFwiLCB0aGlzLml0ZW1PdXQpO1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIodGhpcywgXCJtb3VzZWRvd25cIiwgdGhpcy5pdGVtQ2xpY2tlZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRDaGlsZChhbmNob3IpO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51bm9yZGVyZWRMaXN0LnN0eWxlKHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdHlsZShjb25maWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpdGVtQ2xpY2tlZChlOiBjdXJseS5FdmVudCkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBjdXJseS5FdmVudChEcm9wRG93bi5DSEFOR0UsIHRoaXMsIGVsZW1lbnQuaWQpKTtcclxuXHJcbiAgICAgICAgICAgIFR3ZWVuTWF4LmtpbGxUd2VlbnNPZih0aGlzLnVub3JkZXJlZExpc3QuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMudW5vcmRlcmVkTGlzdC5hbHBoYSA9IDE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVub3JkZXJlZExpc3QudG8oXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BDb25maWcuZHVyYXRpb25Db250cmFjdCxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxheTogMC4zLFxyXG4gICAgICAgICAgICAgICAgICAgIGFscGhhOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6IHRoaXMuaGlkZUxpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZVNjb3BlOiB0aGlzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0ZW1PdmVyKGU6IGN1cmx5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICAgIGVsZW1lbnQudG8odGhpcy5kcm9wQ29uZmlnLmR1cmF0aW9uSW4sIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5kcm9wQ29uZmlnLmJhY2tncm91bmRDb2xvckhvdmVyLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuZHJvcENvbmZpZy5jb2xvckhvdmVyXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXRlbU91dChlOiBjdXJseS5FdmVudCkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xyXG4gICAgICAgICAgICBlbGVtZW50LnRvKHRoaXMuZHJvcENvbmZpZy5kdXJhdGlvbk91dCwge1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmRyb3BDb25maWcuYmFja2dyb3VuZENvbG9yLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuZHJvcENvbmZpZy5jb2xvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYnV0dG9uQ2xpY2tlZChlOiBFdmVudCkge1xyXG4gICAgICAgICAgICBUd2Vlbk1heC5raWxsVHdlZW5zT2YodGhpcy51bm9yZGVyZWRMaXN0LmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51bm9yZGVyZWRMaXN0LnN0eWxlKHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIixcclxuICAgICAgICAgICAgICAgIGFscGhhOiAwLFxyXG4gICAgICAgICAgICAgICAgdG9wOiBcIjAlXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVub3JkZXJlZExpc3QudG8odGhpcy5kcm9wQ29uZmlnLmR1cmF0aW9uRXhwYW5kLCB7IGVhc2U6IFN0cm9uZy5lYXNlT3V0LCBhbHBoYTogMSwgdG9wOiBcIjEwMCVcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5zY29wZWRFdmVudEhhbmRsZXIgPSAoZzogTW91c2VFdmVudCkgPT4geyB0aGlzLmNsb3NlRHJvcChnKSB9O1xyXG5cclxuICAgICAgICAgICAgLy8gISBEb24ndCB0aGluayB0aGlzIHdpbGwgd29yayBpbiBJRTgsIG5lZWQgYXR0YWNoRXZlbnQgb3IgcG9seWZpbGxcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuc2NvcGVkRXZlbnRIYW5kbGVyLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5idXR0b25DbGlja2VkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xvc2VEcm9wKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAgICAgLy8gISBEb24ndCB0aGluayB0aGlzIHdpbGwgd29yayBpbiBJRTgsIG5lZWQgYXR0YWNoRXZlbnQgb3IgcG9seWZpbGxcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuc2NvcGVkRXZlbnRIYW5kbGVyLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIFR3ZWVuTWF4LmRlbGF5ZWRDYWxsKDAsICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKHRoaXMsIFwibW91c2Vkb3duXCIsIHRoaXMuYnV0dG9uQ2xpY2tlZCk7XHJcbiAgICAgICAgICAgIH0pLCBudWxsLCB0aGlzKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnVub3JkZXJlZExpc3QudG8oXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BDb25maWcuZHVyYXRpb25Db250cmFjdCxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhbHBoYTogMCxcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiB0aGlzLmhpZGVMaXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVTY29wZTogdGhpc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaGlkZUxpc3QoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5vcmRlcmVkTGlzdC5zdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihCdXR0b24uQ0xJQ0ssIHRoaXMuYnV0dG9uQ2xpY2tlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmVuYWJsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKHRoaXMsIEJ1dHRvbi5DTElDSywgdGhpcy5idXR0b25DbGlja2VkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwibW9kdWxlIGN1cmx5IHtcclxuICAgIGV4cG9ydCBtb2R1bGUgc3RhdGVNYWNoaW5lIHtcclxuICAgICAgICBleHBvcnQgY2xhc3MgU3RhdGVNYWNoaW5lIGV4dGVuZHMgQ29udGFpbmVyIHtcclxuICAgICAgICAgICAgcHJpdmF0ZSBjdXJyZW50VmlldzogU3RhdGU7XHJcbiAgICAgICAgICAgIHByaXZhdGUgY29uZmlnOiBTdGF0ZU1hY2hpbmVDb25maWc7XHJcbiAgICAgICAgICAgIHByaXZhdGUgdmlld3M6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICBwcml2YXRlIGN1cnJlbnRTdGF0ZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogU3RhdGVNYWNoaW5lQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbmZpZy5pZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUoY29uZmlnLnN0eWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUoY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXBkYXRlKHN0YXRlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gdGhpcy5jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcudmlld3Nbc3RhdGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogXCIwcHhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogXCIwcHhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmNvbmZpZy50bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9baV0gPSB0aGlzLmNvbmZpZy50b1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmNvbmZpZy5mcm9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tW2ldID0gdGhpcy5jb25maWcuZnJvbVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFZpZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmcm9tLmR1cmF0aW9uID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXcudG8oZnJvbS5kdXJhdGlvbiwgeyBsZWZ0OiBmcm9tLmxlZnQsIHRvcDogZnJvbS50b3AsIGFscGhhOiAwLCBvbkNvbXBsZXRlOiB0aGlzLnJlbW92ZVZpZXcsIG9uQ29tcGxldGVTY29wZTogdGhpcywgb25Db21wbGV0ZVBhcmFtczogW3RoaXMuY3VycmVudFZpZXddIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnRWaWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlld3Nbc3RhdGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyB0aGlzLmNvbmZpZy52aWV3c1tzdGF0ZV0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld3Nbc3RhdGVdID0gdmlldztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IDxTdGF0ZT50aGlzLnZpZXdzW3N0YXRlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFZpZXcuaHlkcmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Vmlldy5oeWRyYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmN1cnJlbnRWaWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Vmlldy5zdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHBoYTogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0by5kdXJhdGlvbiA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXcudG8odG8uZHVyYXRpb24sIHsgbGVmdDogdG8ubGVmdCwgdG9wOiB0by50b3AsIGFscGhhOiAxLCBvbkNvbXBsZXRlOiAodmlldykgPT4gdmlldy5zdHlsZSh7IGRpc3BsYXk6IFwiYmxvY2tcIiB9KSwgb25Db21wbGV0ZVBhcmFtczogW3RoaXMuY3VycmVudFZpZXddIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Vmlldy5zdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJibG9ja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdG8udG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRvLmxlZnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIHZpZXcgZGVmaW5lZCBjYWxsZWQ6IFwiLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3IGFscmVhZHkgbG9hZGVkOiBcIiwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcml2YXRlIHJlbW92ZVZpZXcodmlldzogQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHZpZXcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIGN1cmx5IHtcclxuICAgIGV4cG9ydCBtb2R1bGUgc3RhdGVNYWNoaW5lIHtcclxuICAgICAgICBleHBvcnQgaW50ZXJmYWNlIFN0YXRlTWFjaGluZUNvbmZpZyBleHRlbmRzIFN0eWxlRGVjbGFyYXRpb24ge1xyXG4gICAgICAgICAgICBpZD86IHN0cmluZyxcclxuICAgICAgICAgICAgc3R5bGU/OiBTdHlsZURlY2xhcmF0aW9uLFxyXG4gICAgICAgICAgICB0bz86IHtcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgdG9wPzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgbGVmdD86IHN0cmluZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZyb20/OiB7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbj86IG51bWJlcixcclxuICAgICAgICAgICAgICAgIHRvcD86IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIGxlZnQ/OiBzdHJpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2aWV3czoge31cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8ifQ==
