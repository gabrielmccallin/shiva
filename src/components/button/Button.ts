/// <reference path="../container/container.ts" />
module shiva {
    export class Button extends Container {
        static CLICK: string = "click";
        static text: string = "Button";
        private enabled: boolean;
        private icon: Container;
        private styles: ButtonStyleDeclaration;
        private stateOver: boolean;


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
                data: config.data,
                style: {
                    cursor: "pointer"
                }
            });

            this.stateOver = false;
            this.href = href;
            this.enabled = true;

            // copy default styles, copy config.style values, copy config values to the config object and then style the button with that object
            // this.config will also have values that are required later
            this.styles = ObjectUtils.merge({}, Styles.button);
            // for (let i in Styles.button) {
            //     this.styles[i] = Styles.button[i];
            // }

            if (config) {
                if (config.styles) {
                    config.styles.map((style) => {
                        if (!style.hover) {
                            if (!style.hover.backgroundColor) {
                                style.hover.backgroundColor = style.backgroundColor;
                            }
                        }
                        if (!style.hover) {
                            if (!style.hover.color) {
                                style.hover.color = style.color;
                            }
                        }
                        this.styles = ObjectUtils.merge(this.styles, style);
                    });
                }
                if (config.style) {
                    if (!config.style.hover) {
                        if (!config.style.hover.backgroundColor) {
                            config.style.hover.backgroundColor = config.style.backgroundColor;
                        }
                    }
                    if (!config.style.hover) {
                        if (!config.style.hover.color) {
                            config.style.hover.color = config.style.color;
                        }
                    }
                    this.styles = ObjectUtils.merge(this.styles, config.style);
                }
            }



            let buttonLabel = Button.text;
            if (config.text) {
                buttonLabel = config.text;

            }
            let label = document.createTextNode(buttonLabel);
            this.element.appendChild(label);

            if (this.styles.icon && this.styles.icon.code) {
                let icon = new Container({
                    type: "span",
                    style: {
                        display: "inline-block",
                        fontFamily: Styles.button.fontFamily,
                        fontSize: Styles.button.fontSize,
                        pointerEvents: "none"
                    },
                    text: this.styles.icon.code
                });

                if (this.styles.icon.align === "left") {
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

                icon.style(this.styles.icon.style);


            }


            this.addEventListener(this, "mouseover", this.overWithEnable);
            this.addEventListener(this, "mouseout", this.outWithEnable);
            this.addEventListener(this, "click", this.showOutTransition);
            this.addEventListener(this, "pointerdown", this.showOutTransition);
            this.addEventListener(this, "touchdown", this.showOutTransition);

            console.log("this.styles: ", this.styles);
            this.style(this.styles);

        }

        showOutTransition(e: Event) {
            console.log("this.stateOver", this.stateOver);
            console.log("event", e);
            if (this.stateOver && this.enabled) {
                let event = <MouseEvent>e.sourceEvent;
                console.log("play out animation", event.type);
                event.preventDefault();
                event.stopImmediatePropagation();
                event.stopPropagation();

                this.to({
                    duration: this.styles.hover.durationOut,
                    toVars: {
                        backgroundColor: this.styles.backgroundColor,
                        color: this.styles.color
                    }
                }).then(() => {
                    if (this.stateOver) {
                        this.over();
                    }
                });
            }
        }

        over() {
            this.stateOver = true;
            this.to({
                duration: this.styles.hover.durationIn,
                toVars: {
                    backgroundColor: this.styles.hover.backgroundColor,
                    color: this.styles.hover.color
                }
            });
        }

        out() {
            this.stateOver = false;
            this.to({
                duration: this.styles.hover.durationOut,
                toVars: {
                    backgroundColor: this.styles.backgroundColor,
                    color: this.styles.color
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