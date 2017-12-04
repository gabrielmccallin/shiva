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
export { Pages };
