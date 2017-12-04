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
import { Container } from './Container';
import { Event } from './EventDispatcher';
import { ObjectUtils } from './ObjectUtils';
import { Styles } from './Styles';
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
export { Button };
