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
import { Button } from './Button';
import { Container } from './Container';
import { Event } from './EventDispatcher';
import { ObjectUtils } from './ObjectUtils';
import { Styles } from './Styles';
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
        _this.button = new Button({
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
        this.button.removeEventListener(Button.CLICK, this.buttonClicked);
    };
    DropDown.prototype.enable = function () {
        this.button.enable();
        this.button.addEventListener(this, Button.CLICK, this.buttonClicked);
    };
    DropDown.CHANGE = "change";
    return DropDown;
}(Container));
export { DropDown };
