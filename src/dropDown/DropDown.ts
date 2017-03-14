module shiva {
    export class DropDown extends Container {
        static CHANGE = "change";
        private button: Button;
        private caret: Container;
        private unorderedList: Container;
        private scopedEventHandler: EventListener;
        private items: Container[];
        private dropConfig: DropStyleDeclaration;
        private marginPostAnimation: string;


        constructor(config: DropDownConfig) {
            config.id = config.id || "drop-down";

            // copy styles from the config object because we are about to delete it :O
            let style: DropStyleDeclaration = {};
            for (let i in config.style) {
                style[i] = config.style[i];
            }

            delete config.style;

            super(config);

            this.items = [];

            let buttonLabel = Button.label;

            if (style && style.button) {
                buttonLabel = style.button.label;
            }
            if (config.label) {
                buttonLabel = config.label;
            }



            let buttonStyle = {};
            for (let i in Styles.button) {
                buttonStyle[i] = Styles.button[i];
            }
            for (let i in style) {
                buttonStyle[i] = style[i];
            }
            if (style) {
                for (let i in style.button) {
                    buttonStyle[i] = style.button[i];
                }
            }


            this.button = new Button({
                style: buttonStyle,
                zIndex: "1337",
                label: buttonLabel
            });

            this.addChild(this.button);

            let caretStyle = {};
            for (let i in Styles.drop.caret) {
                caretStyle[i] = Styles.drop.caret[i];
            }
            if (style) {
                caretStyle['borderTopColor'] = style['color'];
                for (let i in style.caret) {
                    caretStyle[i] = style.caret[i];
                }
            }

            this.caret = new Container({
                id: "drop-caret",
                style: caretStyle
            });


            this.button.addChild(this.caret);
            this.button.addEventListener(this, "mousedown", this.buttonClicked);
            this.button.addEventListener(this, "mouseover", this.buttonOver);
            this.button.addEventListener(this, "mouseout", this.buttonOut);

            this.dropConfig = {};

            for (let i in Styles.drop) {
                this.dropConfig[i] = Styles.drop[i];
            }

            for (let i in style) {
                this.dropConfig[i] = style[i];
            }

            if (style) {
                for (let i in style.drop) {
                    this.dropConfig[i] = style.drop[i];
                }
            }

            this.unorderedList = new Container({
                type: "ul",
                style: this.dropConfig
            });
            this.unorderedList.style({
                padding: "0rem"
            });


            this.addChild(this.unorderedList);

            let count = 0;

            config.options.map((option) => {
                let item = new Container({
                    id: count.toString(),
                    type: "li",
                });
                this.unorderedList.addChild(item);

                let anchorStyle = {};
                for (let i in Styles.drop.listItem) {
                    anchorStyle[i] = Styles.drop.listItem[i];
                }
                if (style) {
                    anchorStyle['padding'] = style['padding'];
                    anchorStyle['paddingLeft'] = style['paddingLeft'];
                    anchorStyle['paddingRight'] = style['paddingRight'];
                    anchorStyle['paddingTop'] = style['paddingTop'];
                    anchorStyle['paddingBottom'] = style['paddingBottom'];
                    for (let i in style.item) {
                        anchorStyle[i] = style.item[i];
                    }
                }

                let anchor = new Container({
                    id: count.toString(),
                    type: "a",
                    style: anchorStyle
                });

                this.items.push(item);

                anchor.innerHtml = option;

                anchor.addEventListener(this, "mouseover", this.itemOver);
                anchor.addEventListener(this, "mouseout", this.itemOut);
                anchor.addEventListener(this, "mousedown", this.itemClicked);

                item.addChild(anchor);
                count++;

            });

            this.unorderedList.style({
                display: "none"
            });

            this.style({
                position: "relative"
            });
        }


        private buttonOver(e: Event) {
            this.caret.to({
                duration: this.dropConfig.durationIn,
                toVars: {
                    borderTopColor: this.dropConfig.colorHover,
                }
            });
        }

        private buttonOut(e: Event) {
            this.caret.to({
                duration: this.dropConfig.durationOut,
                toVars: {
                    borderTopColor: this.dropConfig.color,
                }
            });
        }

        private itemClicked(e: Event) {
            let element = e.target;

            this.dispatchEvent(new Event(DropDown.CHANGE, this, element.id));

            this.unorderedList.style({
                opacity: "1"
            });

            this.unorderedList.to({
                duration: this.dropConfig.durationContract,
                delay: 0.3,
                toVars: {
                    opacity: "0"
                }
            })
            .then(() => {
                this.unorderedList.style({
                    display: "none"
                });
            });

        }

        itemOver(e: Event) {
            let element = e.target;

            element.to({
                duration: this.dropConfig.durationIn,
                toVars: {
                    backgroundColor: this.dropConfig.backgroundColorHover,
                    color: this.dropConfig.colorHover,
                }
            });
        }

        itemOut(e: Event) {
            let element = e.target;
            element.to({
                duration: this.dropConfig.durationOut,
                toVars: {
                    backgroundColor: this.dropConfig.backgroundColor,
                    color: this.dropConfig.color
                }
            });
        }

        private buttonClicked(e: Event) {
            this.unorderedList.style({
                display: "block",
                // opacity: "0",
            });

            this.unorderedList.fromTo({
                duration: this.dropConfig.durationExpand,
                immediateRender: true,
                fromVars: {
                    opacity: "0",
                    transform: "translateY(-10px)"
                },
                toVars: {
                    opacity: "1",
                    transform: "translateY(0px)"
                }
            });
            this.scopedEventHandler = (g: MouseEvent) => { this.closeDrop(g) };

            // ! Don't think this will work in IE8, need attachEvent or polyfill
            document.addEventListener("mousedown", this.scopedEventHandler, true);

            this.button.removeEventListener("mousedown", this.buttonClicked);
        }

        private closeDrop(e: MouseEvent) {
            // ! Don't think this will work in IE8, need attachEvent or polyfill
            document.removeEventListener("mousedown", this.scopedEventHandler, true);

            setTimeout(() => {
                this.button.addEventListener(this, "mousedown", this.buttonClicked);
            }, 10);
            this.unorderedList.to({
                duration: this.dropConfig.durationContract,
                toVars:
                {
                    opacity: "0",
                }
            })
            .then(() => {
                this.unorderedList.style({
                    display: "none"
                });
            });
        }

        disable() {
            this.button.disable();
            this.button.removeEventListener(Button.CLICK, this.buttonClicked);
        }

        enable() {
            this.button.enable();
            this.button.addEventListener(this, Button.CLICK, this.buttonClicked);
        }

    }
}