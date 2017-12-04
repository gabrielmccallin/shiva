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
export { Window };
