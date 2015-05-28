var curly;
(function (curly) {
    var Event = (function () {
        function Event(type, targetObj, data) {
            this._type = type;
            this._target = targetObj;
            this.data = data;
        }
        Event.prototype.getTarget = function () {
            return this._target;
        };

        Event.prototype.getType = function () {
            return this._type;
        };

        Event.prototype.getData = function () {
            return this.data;
        };
        return Event;
    })();
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

        EventDispatcher.prototype.addEventListener = function (scope, typeStr, listenerFunc) {
            if (this.hasEventListener(typeStr, listenerFunc)) {
                return;
            }

            this._listeners.push({ scope: scope, type: typeStr, listener: listenerFunc });
        };

        EventDispatcher.prototype.removeEventListener = function (typeStr, listenerFunc) {
            for (var i = 0; i < this._listeners.length; i++) {
                if (this._listeners[i].type === typeStr && this._listeners[i].listener === listenerFunc) {
                    this._listeners.splice(i, 1);
                }
            }
        };

        EventDispatcher.prototype.dispatchEvent = function (evt) {
            for (var i = 0; i < this._listeners.length; i++) {
                if (this._listeners[i].type === evt.getType()) {
                    this._listeners[i].listener.call(this._listeners[i].scope, evt);
                }
            }
        };
        return EventDispatcher;
    })();
    curly.EventDispatcher = EventDispatcher;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var Properties = (function () {
        function Properties() {
        }
        Properties.set = function (object, vars) {
            var element;
            if (object.element) {
                element = object.element;
            } else {
                element = object;
            }

            for (var i in vars) {
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
                                var red = vars[i] >> 16;
                                var green = (vars[i] >> 8) & 255;
                                var blue = vars[i] & 255;
                                value = "rgb(" + red + "," + green + "," + blue + ")";
                                break;
                            case "color":
                                var red = vars[i] >> 16;
                                var green = (vars[i] >> 8) & 255;
                                var blue = vars[i] & 255;
                                value = "rgb(" + red + "," + green + "," + blue + ")";
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
        };
        return Properties;
    })();
    curly.Properties = Properties;
})(curly || (curly = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var curly;
(function (curly) {
    var Container = (function (_super) {
        __extends(Container, _super);
        function Container(id, type) {
            _super.call(this);
            if (type) {
                if (typeof type == "boolean") {
                    this.element = document.createElement("div");
                    document.body.appendChild(this.element);
                } else {
                    this.element = document.createElement(type);
                }
            } else {
                this.element = document.createElement("div");
            }
            this.element.id = id;

            this.set({
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                display: "block"
            });
        }
        Container.prototype.measure = function () {
            if (!document.body.contains(this.element)) {
                var parent = this.element.parentElement;
                document.body.appendChild(this.element);

                this.calculatedWidth = this.element.offsetWidth;
                this.calculatedHeight = this.element.offsetHeight;

                if (parent) {
                    parent.appendChild(this.element);
                } else {
                    document.body.removeChild(this.element);
                }
            } else {
                if (!this.calculatedWidth) {
                    this.calculatedWidth = this.element.offsetWidth;
                }
                if (!this.calculatedHeight) {
                    this.calculatedHeight = this.element.offsetHeight;
                }
            }
        };

        Container.prototype.addToBody = function () {
            document.body.appendChild(this.element);
        };

        Container.prototype.set = function (vars) {
            curly.Properties.set(this.element, vars);
        };

        Container.prototype.addChild = function (child) {
            var childElement;
            if (child.element) {
                childElement = child.element;
            } else {
                childElement = child;
            }

            this.element.appendChild(childElement);
        };

        Container.prototype.removeChild = function (child) {
            if (this.element === child.element.parentNode) {
                this.element.removeChild(child.element);
            }
        };

        Container.prototype.to = function (duration, vars) {
            TweenMax.to(this.element, duration, vars);
        };

        Container.prototype.fromTo = function (duration, fromVars, toVars) {
            TweenMax.fromTo(this.element, duration, fromVars, toVars);
        };

        Container.prototype.addDomEventListener = function (scope, typeStr, listenerFunc) {
            var scopedEventHandler = scope ? function (e) {
                listenerFunc.apply(scope, [e]);
            } : listenerFunc;

            this._listeners.push({ scope: scope, type: typeStr, listener: listenerFunc, scopedEventHandler: scopedEventHandler });

            if (this.element.addEventListener) {
                this.element.addEventListener(typeStr, scopedEventHandler, false);
            } else if (this.element.attachEvent) {
                this.element.attachEvent('on' + typeStr, scopedEventHandler);

                this.element.attachEvent("onpropertychange", function (e) {
                    if (e.eventType == typeStr) {
                        e.cancelBubble = true;
                        e.returnValue = false;
                        e.data = e.customData;
                        scopedEventHandler(e);
                    }
                });
            } else {
            }
        };

        Container.prototype.removeDomEventListener = function (typeStr, listenerFunc) {
            for (var i = 0; i < this._listeners.length; i++) {
                if (this._listeners[i].type === typeStr && this._listeners[i].listener === listenerFunc) {
                    if (this.element.removeEventListener) {
                        this.element.removeEventListener(typeStr, this._listeners[i].scopedEventHandler, false);
                        return true;
                    } else if (this.element.detachEvent) {
                        return this.element.detachEvent('on' + typeStr, listenerFunc);
                    } else {
                        return false;
                    }
                    this._listeners.splice(i, 1);
                }
            }
        };

        Container.prototype.preventDefault = function (e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
        };

        Object.defineProperty(Container.prototype, "width", {
            get: function () {
                this.measure();
                return this.calculatedWidth;
            },
            set: function (w) {
                curly.Properties.set(this.element, { width: w });
                this.calculatedWidth = this.element.offsetWidth;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Container.prototype, "height", {
            get: function () {
                this.measure();
                return this.calculatedHeight;
            },
            set: function (h) {
                curly.Properties.set(this.element, { height: h });
                this.calculatedHeight = this.element.offsetHeight;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Container.prototype, "y", {
            get: function () {
                return this.element.offsetTop;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Container.prototype, "x", {
            get: function () {
                return this.element.offsetLeft;
            },
            enumerable: true,
            configurable: true
        });
        return Container;
    })(curly.EventDispatcher);
    curly.Container = Container;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var ButtonVars = (function () {
        function ButtonVars() {
        }
        return ButtonVars;
    })();
    curly.ButtonVars = ButtonVars;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(vars) {
            if (vars.id) {
                _super.call(this, vars.id);
                this.identifier = vars.id;
            } else {
                _super.call(this, "Button");
                this.identifier = "Button";
            }
            this.enabled = true;

            if (vars.target === undefined) {
                vars.target = "_self";
            }

            this.addDomEventListener(this, "mouseover", this.overWithEnable);
            this.addDomEventListener(this, "mouseout", this.outWithEnable);
            this.addDomEventListener(this, "click", this.click);

            if (vars.href) {
                var link = new curly.Container("link", "a");
                var linkElement = link.element;
                linkElement.href = vars.href;
                linkElement.target = vars.target;

                link.set({
                    width: vars.width,
                    height: vars.height,
                    backgroundColor: 0x000000,
                    alpha: 0
                });

                this.addChild(link);
            }

            this.set({ width: vars.width, height: vars.height, cursor: "pointer" });
        }
        Button.prototype.init = function () {
        };

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

        Button.prototype.over = function () {
        };

        Button.prototype.out = function () {
        };

        Button.prototype.click = function () {
            if (this.enabled) {
                var event = new curly.Event(Button.CLICK, this);
                this.dispatchEvent(event);
            }
        };

        Button.prototype.disable = function () {
            this.enabled = false;
            this.set({ cursor: "default" });
        };

        Button.prototype.select = function () {
            this.enabled = false;
            this.set({ cursor: "default" });
        };

        Button.prototype.enable = function () {
            this.enabled = true;
            this.set({ cursor: "pointer" });
        };

        Button.prototype.setId = function (identifier) {
            this.identifier = identifier;
        };
        Button.CLICK = "CLICK";
        return Button;
    })(curly.Container);
    curly.Button = Button;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image(id) {
            if (id) {
                _super.call(this, id, "img");
            } else {
                _super.call(this, "Image", "img");
            }
            this.set({
                width: "auto",
                height: "auto"
            });

            this.addDomEventListener(this, "load", this.loaded);
            this.addDomEventListener(this, "error", this.error);
        }
        Image.prototype.loaded = function (e) {
            console.log("picture loaded: ", e);
        };

        Image.prototype.error = function (e) {
            console.log("error");
        };

        Image.prototype.load = function (path) {
            this.element.setAttribute("src", path);
        };
        return Image;
    })(curly.Container);
    curly.Image = Image;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var TextFieldVars = (function () {
        function TextFieldVars() {
            this.text = "Text";
        }
        return TextFieldVars;
    })();
    curly.TextFieldVars = TextFieldVars;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField(vars) {
            if (vars.id) {
                _super.call(this, vars.id);
            } else {
                _super.call(this, "TextField");
            }

            if (vars.fontSize == "") {
                vars.fontSize = "1em";
            }

            var width;
            if (vars.width) {
                width = vars.width;
            } else {
                width = "auto";
            }

            var height;
            if (vars.height) {
                height = vars.height;
            } else {
                height = "auto";
            }

            this.set({
                width: width,
                height: height,
                top: 0,
                left: 0,
                overflow: "hidden",
                msUserSelect: "text"
            });
            this.set(vars);

            this.setText(vars.text);
        }
        TextField.prototype.setText = function (text) {
            this.element.innerHTML = text;
        };

        TextField.prototype.addText = function (text) {
            text = this.element.innerHTML + text;
            this.element.innerHTML = text + "<br/>";
        };

        TextField.prototype.addBorder = function (thickness, style, colour) {
            if (thickness == null) {
                thickness = 1;
            }
            if (style == null) {
                style = "solid";
            }
            if (colour == null) {
                colour = 0x000000;
            }
            this.element.style.border = thickness + "px";
            this.element.style.borderStyle = style;
            this.element.style.borderColor = String(colour);
        };
        return TextField;
    })(curly.Container);
    curly.TextField = TextField;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(width, height, colour, id) {
            if (id) {
                _super.call(this, id);
            } else {
                _super.call(this, "Rectangle");
            }

            this.set({
                width: width,
                height: height,
                backgroundColor: colour,
                top: 0,
                left: 0,
                overflow: "hidden"
            });
        }
        Rectangle.prototype.addBorder = function (thickness, style, colour) {
            if (typeof thickness === "undefined") { thickness = 1; }
            if (typeof style === "undefined") { style = "solid"; }
            if (typeof colour === "undefined") { colour = "#000000"; }
            this.set({
                border: thickness + "px",
                borderStyle: style,
                borderColor: String(colour)
            });
        };
        return Rectangle;
    })(curly.Container);
    curly.Rectangle = Rectangle;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var LabelButtonVars = (function () {
        function LabelButtonVars() {
            this.text = "Button";
            this.bgColourOut = "#dddddd";
            this.bgColourOver = "#5555dd";
            this.margin = 10;
        }
        return LabelButtonVars;
    })();
    curly.LabelButtonVars = LabelButtonVars;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var LabelButton = (function (_super) {
        __extends(LabelButton, _super);
        function LabelButton(vars) {
            if (!vars) {
                vars = new curly.LabelButtonVars();
            }

            if (!vars.id && vars.text) {
                vars.id = vars.text;
            }

            _super.call(this, vars);
            this.vars = vars;

            var textFieldVars = new curly.TextFieldVars();
            for (var i in this.vars) {
                textFieldVars[i] = this.vars[i];
            }

            if (this.vars.width) {
                textFieldVars.width = this.vars.width - (this.vars.margin * 2);
            }
            textFieldVars.color = this.vars.fontColourOut;
            textFieldVars.height = "auto";

            this.field = new curly.TextField(textFieldVars);

            this.field.set({
                letterSpacing: this.vars.letterSpacing,
                whiteSpace: "nowrap"
            });

            this.addChild(this.field);

            if (this.vars.width) {
                this.btnWidth = this.vars.width;
            } else {
                this.btnWidth = this.field.width + (this.vars.margin * 2);
            }

            if (this.vars.height) {
                this.btnHeight = this.vars.height;
            } else {
                this.btnHeight = this.field.height + (this.vars.margin * 2);
            }

            this.bg = new curly.Rectangle(this.btnWidth, this.btnHeight, this.vars.bgColourOut, "buttonBg");
            if (this.vars.cornerRadius) {
                this.bg.set({
                    borderRadius: this.vars.cornerRadius
                });
            }
            if (this.vars.border) {
                this.bg.addBorder(this.vars.borderThickness, this.vars.border, this.vars.borderColour);
            }

            this.addChild(this.bg);
            this.addChild(this.field);

            var fieldY = (this.btnHeight / 2) - (this.field.height / 2);
            this.field.set({ x: this.vars.margin, y: fieldY });
            this.set({ width: this.btnWidth, height: this.btnHeight, cursor: "pointer" });
        }
        LabelButton.prototype.init = function () {
        };

        LabelButton.prototype.over = function () {
            this.field.to(0.1, { color: this.vars.fontColourOver });
            this.bg.to(0.1, { backgroundColor: this.vars.bgColourOver });
        };

        LabelButton.prototype.out = function () {
            this.field.to(1, { color: this.vars.fontColourOut });
            if (this.selected && this.vars.bgSelectedColour) {
                this.bg.to(1, { backgroundColor: this.vars.bgSelectedColour });
            } else {
                this.bg.to(1, { backgroundColor: this.vars.bgColourOut });
            }
        };

        LabelButton.prototype.update = function (text) {
            this.field.setText(text);
            _super.prototype.setId.call(this, text);
        };

        LabelButton.prototype.disable = function () {
            _super.prototype.disable.call(this);

            TweenMax.to(this.field.element, 1, { alpha: 0.2 });
            TweenMax.to(this.bg.element, 1, { alpha: 0.2 });
        };

        LabelButton.prototype.select = function () {
            _super.prototype.select.call(this);

            this.selected = true;

            TweenMax.to(this.field.element, 0.5, { color: this.vars.fontColourOver, alpha: 1 });
            if (this.vars.bgSelectedColour) {
                TweenMax.to(this.bg.element, 0.5, { backgroundColor: this.vars.bgSelectedColour, alpha: 1 });
            }
        };

        LabelButton.prototype.enable = function () {
            _super.prototype.enable.call(this);

            this.selected = false;

            TweenMax.to(this.field.element, 1, { color: this.vars.fontColourOut, alpha: 1 });
            TweenMax.to(this.bg.element, 1, { backgroundColor: this.vars.bgColourOut, alpha: 1 });
        };



        Object.defineProperty(LabelButton.prototype, "height", {
            get: function () {
                return this.btnHeight;
            },
            set: function (h) {
                this.field.height = h;
                this.bg.height = h;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(LabelButton.prototype, "width", {
            get: function () {
                return this.btnWidth;
            },
            set: function (w) {
                this.field.width = w;
                this.bg.width = w;
            },
            enumerable: true,
            configurable: true
        });
        return LabelButton;
    })(curly.Button);
    curly.LabelButton = LabelButton;
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
            var type = evt.getType();
            if (this.observers[type]) {
                for (var i = 0; i < this.observers[type].length; i++) {
                    this.observers[type][i].callback.call(this.observers[type][i].scope, evt);
                }
            } else {
                console.log("DISPATCH ERROR: NO OBSERVER REGISTERED");
            }
        };
        Observer.observers = {};
        return Observer;
    })();
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
            var targetHeight = areaWidth * ratio;

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
    })();
    curly.Resize = Resize;
})(curly || (curly = {}));
var curly;
(function (curly) {
    var URLLoader = (function (_super) {
        __extends(URLLoader, _super);
        function URLLoader() {
            _super.call(this);
        }
        URLLoader.prototype.load = function (url, method, params, scope, cache) {
            if (typeof cache === "undefined") { cache = false; }
            if (this.http) {
                this.http.abort();
            }
            this.http = new XMLHttpRequest();
            this.http.open(method, url, true);

            console.log("LOADING", url);
            this.http.timeout = 20000;

            if (!cache) {
                this.http.setRequestHeader("If-Modified-Since", "Sat, 01 Jan 2005 00:00:00 GMT");
            }

            this.http.onreadystatechange = this.handleResponse.bind(this);
            this.http.send(params);
        };

        URLLoader.prototype.post = function (url, params, scope, cache) {
            if (typeof cache === "undefined") { cache = false; }
            if (this.http) {
                this.http.abort();
            }
            this.http = new XMLHttpRequest();
            this.http.open("POST", url, true);

            console.log("LOADING", url);
            this.http.timeout = 20000;
            this.http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            this.http.setRequestHeader("Content-type", "application/json");

            if (!cache) {
                this.http.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
            }

            this.http.onreadystatechange = this.handleResponse.bind(this);
            this.http.send(params);
        };

        URLLoader.prototype.handleResponse = function () {
            if (this.http.readyState == 4) {
                if (this.http.status == 200) {
                    var event = new curly.Event(URLLoader.COMPLETE, this, this.http.responseText);
                    _super.prototype.dispatchEvent.call(this, event);

                    this.http.onreadystatechange = null;
                } else {
                    var error;
                    if (this.http.status === 0) {
                        error = "Network Error 0x2ee2";
                    } else {
                        error = this.http.status.toString();
                    }
                    var event = new curly.Event(URLLoader.ERROR, this, this.http.status);
                    _super.prototype.dispatchEvent.call(this, event);
                }
            }
        };
        URLLoader.COMPLETE = "COMPLETE";
        URLLoader.ERROR = "ERROR";
        return URLLoader;
    })(curly.EventDispatcher);
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
                } else {
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
                } else {
                    scrollLeft = (document.body.parentElement) ? document.body.parentElement.scrollLeft : 0;
                }
            }

            return scrollLeft;
        };

        Object.defineProperty(Window, "height", {
            get: function () {
                return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Window, "width", {
            get: function () {
                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            },
            enumerable: true,
            configurable: true
        });
        return Window;
    })();
    curly.Window = Window;
})(curly || (curly = {}));
//# sourceMappingURL=curly.js.map
