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
export { CheckBox };
