module curly {
    export class Properties {
        static set(object: any, vars: Object) {
            var element: HTMLElement;
            if (object.element) {
                element = object.element;
            }
            else {
                element = object;
            }

            for (var i in vars) {
                var value:any = vars[i];
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
                var styleName: string = i;
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
    }
}

   

