/// <reference path="container.ts" />
/// <reference path="buttonvars.ts" />
module curly {
    export class Button extends curly.Container {
        static CLICK: string = "CLICK";
        private style;
        private enabled: boolean;
        private identifier: string;

        constructor(vars: curly.ButtonVars) {
            if (vars.id) {
                super(vars.id);
                this.identifier = vars.id;
            }
            else {
                super("Button");
                this.identifier = "Button";
            }
            this.enabled = true;

            if (vars.target === undefined) {
                vars.target = "_self";
            }

            this.addDomEventListener(this, "mouseover", this.overWithEnable);
            this.addDomEventListener(this, "mouseout", this.outWithEnable);
            this.addDomEventListener(this, "click", this.click);

            if (vars.href) {
                var link = new Container("link", "a");
                var linkElement = <HTMLAnchorElement>link.element;
                linkElement.href = vars.href;
                linkElement.target = vars.target;

                link.set({
                    width: vars.width,
                    height: vars.height,
                    backgroundColor: 0x000000,
                    alpha: 0
                });

                this.addChild(link);
            }

            this.set({ width: vars.width, height: vars.height, cursor: "pointer" });
        }



        init() {
            

        }


        private overWithEnable(e) {
            if (this.enabled) {
                this.over();
            }
        }

        private outWithEnable(e) {
            if (this.enabled) {
                this.out();
            }
        }

        over() {
            
        }

        out() {

        } 


        click() {
            if (this.enabled) {
                //this.out();
                var event = new curly.Event(Button.CLICK, this);
                this.dispatchEvent(event);
            }
        }

        disable() {
            this.enabled = false;
            this.set( {cursor:"default"});
        }

        select() {
            this.enabled = false;
            this.set({ cursor: "default" });
        }

        enable() {
            this.enabled = true;
            this.set({ cursor: "pointer" });
        }

        setId(identifier:string) {
            this.identifier = identifier;
        }
    }


}