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
export { Select };
