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
export { Properties };
