/// <reference path="container.ts" />
module shiva {
    export class Button extends Container {
        static CLICK: string = "click";
        private enabled: boolean;
        private config: ButtonConfig;
        private icon: Container;


        constructor(config: ButtonConfig) {
            let type: string;
            let id: string;
            let href: string;
            if (config) {
                if (config.href) {
                    type = "a";
                    href = config.href;
                }
                else {
                    type = "button";
                }
                if (config.type) {
                    type = config.type;
                }
                id = config.id;
            }
            super({
                id: id,
                type: type,
                cursor: "pointer"
            });

            this.href = href;
            this.enabled = true;

            // copy default styles, copy config.style values, copy config values to the config object and then style the button with that object
            // this.config will also have values that are required later
            this.config = {};
            for (let i in Styles.button) {
                this.config[i] = Styles.button[i];
            }

            if (config) {
                for (let i in config.style) {
                    this.config[i] = config.style[i];
                }
            }

            for (let i in config) {
                this.config[i] = config[i];
            }

            let label = document.createTextNode(this.config.text);
            this.element.appendChild(label);

            if (this.config.icon && this.config.icon.code) {
                let icon = new Container({
                    type: "span",
                    display: "inline-block",
                    text: this.config.icon.code
                });

                icon.style({
                    fontFamily: Styles.button.fontFamily,
                    fontSize: Styles.button.fontSize,
                    pointerEvents: "none"
                });

                if (this.config.icon.align === "left") {
                    icon.style({
                        paddingRight: Styles.button.padding,
                    });
                    this.element.removeChild(label);
                    this.addChild(icon);
                    this.element.appendChild(label);
                }
                else {
                    icon.style({
                        paddingLeft: Styles.button.padding
                    });
                    this.addChild(icon);

                }

                icon.style(this.config.icon.style);


            }


            this.addEventListener(this, "mouseover", this.overWithEnable);
            this.addEventListener(this, "mouseout", this.outWithEnable);

            this.style(this.config);

        }

        over() {
            this.to({
                duration: this.config.durationIn,
                toVars: {
                    backgroundColor: this.config.backgroundColorHover,
                    color: this.config.colorHover
                }
            });
        }

        out() {
            this.to({
                duration: this.config.durationOut,
                toVars: {
                    backgroundColor: this.config.backgroundColor,
                    color: this.config.color
                }
            });
        }


        click(e: MouseEvent) {
            if (this.enabled) {
                //this.out();
                var event = new shiva.Event(Button.CLICK, this, e);
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