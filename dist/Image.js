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
export { Image };
