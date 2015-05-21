/// <reference path="../greensock.d.ts"/>
/// <reference path="container.ts" />
/// <reference path="textfieldvars.ts" />

module curly {
    export class TextField extends Container {

        constructor(vars: TextFieldVars) {
            if (vars.id) {
                super(vars.id);
            }
            else {
                super("TextField");
            }

            if (vars.fontSize == "") {
                vars.fontSize = "1em";
            }

            var width: any;
            if (vars.width) {
                width = vars.width;
            }
            else {
                width = "auto";
            }

            var height: any;
            if (vars.height) {
                height = vars.height;
            }
            else {
                height = "auto";
            }

            //default
            this.set({
                width: width,
                height: height,
                top: 0,
                left: 0,
                overflow: "hidden",
                msUserSelect: "text"
            });
            this.set(vars);


            this.setText(vars.text);

        }


        setText(text: string) {
            this.element.innerHTML = text;
        }


        addText(text: string) {
            text = this.element.innerHTML + text;
            this.element.innerHTML = text + "<br/>";
        }


        


        addBorder(thickness: number, style: string, colour: number) {
            if (thickness == null) {
                thickness = 1;
            }
            if (style == null) {
                style = "solid";
            }
            if (colour == null) {
                colour = 0x000000;
            }
            this.element.style.border = thickness + "px";
            this.element.style.borderStyle = style;
            this.element.style.borderColor = String(colour);
        }


    }
}






