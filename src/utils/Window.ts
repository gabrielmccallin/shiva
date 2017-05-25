export class Window {
    static scrollY() {
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
    }

    static scrollX() {
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
    }

    static get height() {
        return window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
    }

    static get width() {
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
    }



}