/// <reference path="container.ts" />
module curly {
    export class Button extends Container {
        static CLICK: string = "click";
        private enabled: boolean;
        private config: ButtonConfig;
        private icon: Container;


        constructor(config: ButtonConfig) {
            let type: string;
            if (config.href) {
                type = "a";
            }
            else {
                type = "button";
            }
            super({
                id: config.id,
                type: type,
                cursor: "pointer"
            });

            this.href = config.href;
            this.enabled = true;  

            if (config.icon && config.icon.code) {
                this.icon = new Container({
                    type: "span",
                    text: config.icon.code
                });
            }

            this.update(config);
        }

        update(config: ButtonConfig) {
            this.config = {};
            for (let i in Styles.button){
                this.config[i] = Styles.button[i];
            }
            
            if (config && config.style) {
                for (let i in config.style) {
                    this.config[i] = config.style[i];
                }
            }

            for (let i in config) {
                this.config[i] = config[i];
            }

            if (config.style) {
                for (let i in config.style.icon) {
                    this.config.icon[i] = config.style.icon[i];
                }
            }

            this.innerHtml = config.text;

            this.addEventListener(this, "mouseover", this.overWithEnable);
            this.addEventListener(this, "mouseout", this.outWithEnable);


            if (this.config.icon && this.config.icon.code) {
                if (this.config.icon.align === "left") {
                    this.icon.style({
                        paddingRight: this.config.icon.padding,
                    });
                }
                else {
                    this.icon.style({
                        paddingLeft: this.config.icon.padding
                    });
                }
                this.icon.style({
                    fontFamily: this.config.icon.fontFamily,
                    fontSize: this.config.icon.fontSize,
                    float: this.config.icon.align,
                    pointerEvents: "none"
                }); 

                this.addChild(this.icon);

                // this.icon.style({
                // paddingLeft: "0.5em",
                // paddingRight: "0.5em",
                // });
            }
            //anything else in the config
            this.style(this.config);

        }


        over() {
            this.to(this.config.durationIn, {
                backgroundColor: this.config.backgroundColorHover,
                // backgroundColor: "#ff0000",
                color: this.config.colorHover  
            });
        }

        out() {
            this.to(this.config.durationOut, {
                backgroundColor: this.config.backgroundColor,   
                color: this.config.color
            });
        }


        click(e: MouseEvent) {
            if (this.enabled) {
                //this.out();
                var event = new curly.Event(Button.CLICK, this, e);
                this.dispatchEvent(event);
            }
        }

        disable() {
            this.enabled = false;
            this.style({ cursor: "default" });
        }

        select() {
            this.enabled = false;
            this.style({ cursor: "default" });
        }

        enable() {
            this.enabled = true;
            this.style({ cursor: "pointer" });
            this.out();
        }


        public get data(): string {
            return this.config.data;
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

    }


}