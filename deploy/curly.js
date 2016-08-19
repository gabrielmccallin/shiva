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
                    // recommended properties
                    this._element.style.position = "absolute";
                    this._element.style.height = "100%";
                    this._element.style.width = "100%";
                    this._element.style.top = "0px";
                    this._element.style.left = "0px";
                    this._element.style.margin = "0px";
                    this._element.id = "app";
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
            if (config.type) {
                type = config.type;
            }
            _super.call(this, {
                id: config.id,
                type: type,
                cursor: "pointer",
                display: "inline-block"
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
            for (var i in curly.Styles.button) {
                this.config[i] = curly.Styles.button[i];
            }
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
/// <reference path="container.ts" />
var curly;
(function (curly) {
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        function RadioButton(config) {
            _super.call(this, {
                type: "input"
            });
            var element = this.element;
            element.type = "radio";
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
    }(curly.Container));
    curly.RadioButton = RadioButton;
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
            durationExpand: "0.5",
            durationContract: "0.5"
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
                display: "inline-block",
                text: "button",
                type: "div",
                zIndex: "1001",
                position: "absolute"
            });
            if (config.button) {
                config.button.text = buttonText;
                this.button.update(config.button);
            }
            this.addChild(this.button);
            var caret = new curly.Container({
                id: "drop-caret",
                style: curly.Styles.caret,
                pointerEvents: "none"
            });
            if (config.caret) {
                caret.style(config.caret);
            }
            this.button.addChild(caret);
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
                top: "0px"
            });
            this.unorderedList.to(this.dropConfig.durationExpand, { ease: Strong.easeOut, alpha: 1, top: this.button.height });
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

//# sourceMappingURL=curly.js.map
