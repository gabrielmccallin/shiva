import { StyleDeclaration } from './StyleDeclaration';

export class Properties {
    static style(object: any, vars: StyleDeclaration) {
        let element: HTMLElement;
        if (object.element) {
            element = object.element;
        }
        else {
            element = object;
        }

        for (let i in vars) {
            if (vars.hasOwnProperty(i)) {
                let value: any = vars[i];
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
                            // case "backgroundColor":
                            //     // let red = vars[i] >> 16;
                            //     // let green = (vars[i] >> 8) & 255;
                            //     // let blue = vars[i] & 255;
                            //     value = "rgb(" + (vars[i] >> 16) + "," + ((vars[i] >> 8) & 255) + "," + (vars[i] & 255) + ")";
                            //     break;
                            // case "color":
                            //     value = "rgb(" + (vars[i] >> 16) + "," + ((vars[i] >> 8) & 255) + "," + (vars[i] & 255) + ")";
                            //     break;
                            default:
                                break;
                        }
                    }
                }

                let styleName: string = i;
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