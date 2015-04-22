/// <reference path="properties.ts" />
/// <reference path="eventdispatcher.ts" />
/// <reference path="textfield.ts" />
/// <reference path="rectangle.ts" />
/// <reference path="button.ts" />
/// <reference path="container.ts" />
/// <reference path="buttonvars.ts" />
/// <reference path="textfieldvars.ts" />
/// <reference path="labelbuttonvars.ts" />
module curly {
    export class LabelButton extends Button {
        private field: TextField;
        private bg: Rectangle;
        private vars: LabelButtonVars;
        private selected: boolean;
        private btnWidth: number;
        private btnHeight: number;

        constructor(vars?: LabelButtonVars) {
            if (!vars) {
                vars = new LabelButtonVars();
            }

            if (!vars.id && vars.text) {
                vars.id = vars.text;
            }

            super(vars);
            this.vars = vars;
        }

        init() {

            var textFieldVars = new TextFieldVars();
            for (var i in this.vars) {
                textFieldVars[i] = this.vars[i];
            }
            //textFieldVars.text = this.vars.text;
            textFieldVars.color = this.vars.fontColourOut;
            textFieldVars.height = "auto";
            //textFieldVars.fontFamily = this.vars.fontFamily;
            //textFieldVars.fontSize = this.vars.fontSize;
            //textFieldVars.fontWeight = this.vars.fontWeight;

            this.field = new curly.TextField(textFieldVars);

            this.field.set({
                letterSpacing: this.vars.letterSpacing,
                whiteSpace: "nowrap"
            });

            //this.field.element..border = "1px";
            //this.field.element..border = "solid";
            //this.field.element..borderColor = "#ff0000";

            this.addChild(this.field);


            if (this.vars.width) {
                this.btnWidth = this.vars.width;
            }
            else {
                this.btnWidth = this.field.width + (this.vars.margin * 2);
            }

            if (this.vars.height) {
                this.btnHeight = this.vars.height;
            }
            else {
                this.btnHeight = this.field.height + (this.vars.margin * 2);
            }


            this.bg = new Rectangle(this.btnWidth, this.btnHeight, this.vars.bgColourOut, "buttonBg");
            if (this.vars.cornerRadius) {
                this.bg.set({
                    borderRadius:this.vars.cornerRadius
                });
            }
            if (this.vars.border) {
                this.bg.addBorder(this.vars.borderThickness, this.vars.border, this.vars.borderColour);
            }

            this.addChild(this.bg);
            this.addChild(this.field);

            var fieldY = (this.btnHeight / 2) - (this.field.height / 2);
            this.field.set({ x: this.vars.margin, y: fieldY });
            this.set({ width: this.btnWidth, height: this.btnHeight, cursor: "pointer" });

        }


        over() {
            this.field.to(0.1, { color: this.vars.fontColourOver });
            this.bg.to(0.1, { backgroundColor: this.vars.bgColourOver });
            
        }

        out() {
            this.field.to(1, { color: this.vars.fontColourOut });
            if (this.selected && this.vars.bgSelectedColour) {
                this.bg.to(1, { backgroundColor: this.vars.bgSelectedColour});
            }
            else {
                this.bg.to(1, { backgroundColor: this.vars.bgColourOut });
            }
        }


        update(text: string) {
            this.field.setText(text);
            super.setId(text);
            //this.setBgWidth(this.field.element.clientWidth + (this.vars..margin * 2));
        }


        disable() {
            super.disable();

            TweenMax.to(this.field.element, 1, { alpha: 0.2 });
            TweenMax.to(this.bg.element, 1, { alpha: 0.2 });
        }

        select() {
            //super.select();

            this.selected = true;

            TweenMax.to(this.field.element, 0.5, { color: this.vars.fontColourOver, alpha: 1 });
            if (this.vars.bgSelectedColour) {
                TweenMax.to(this.bg.element, 0.5, { backgroundColor: this.vars.bgSelectedColour, alpha: 1 });
            }
        }

        enable() {
            super.enable();

            this.selected = false;

            TweenMax.to(this.field.element, 1, { color: this.vars.fontColourOut, alpha: 1 });
            TweenMax.to(this.bg.element, 1, { backgroundColor: this.vars.bgColourOut, alpha: 1 });

        }

        set height(h:number){
            this.field.height = h;
            this.bg.height = h;
        }

        set width(w: number) {
            this.field.width = w;
            this.bg.width = w;
        }

        get height():number {
            return this.btnHeight;
        }

        get width(): number {
            return this.btnWidth;
        }
    }


}




