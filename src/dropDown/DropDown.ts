/// <reference path="../container.ts" />
module curly {
    export class DropDown extends Container {
        static CHANGE = "change";
        private button: Button;
        private unorderedList: Container;
        private scopedEventHandler: EventListener;
        private items: Container[];
        private dropConfig: DropConfig;


        constructor(config: DropDownConfig) {
            let buttonText = "Button";
            if (config.text) {
                buttonText = config.text;
            }
            config.text = undefined;
            config.position = "relative";

            super(config);

            this.items = [];

            this.button = new Button({
                style: Styles.button,
                display: "inline-block",
                text: "button",
                type: "div",
                zIndex: "1001",
                position: "absolute"
            });

            if (config.button) {
                config.button.text = buttonText;
                this.button.update(config.button);
            }

            this.addChild(this.button);


            let caret = new curly.Container({
                id: "drop-caret",
                style: Styles.caret,
                pointerEvents: "none"
            });

            if (config.caret) {
                caret.style(config.caret);
            }

            this.button.addChild(caret);

            this.button.addEventListener(this, "mousedown", this.buttonClicked);

            this.unorderedList = new Container({
                type: "ul",
                id: this.id
            });

            this.dropConfig = {};

            for (let i in Styles.drop) {
                this.dropConfig[i] = Styles.drop[i];
            }

            for (let i in config.drop) {
                this.dropConfig[i] = config.drop[i];
            }

            this.unorderedList.style(this.dropConfig);

            this.addChild(this.unorderedList);

            let count = 0;

            config.options.map((option) => {
                let item = new Container({
                    id: count.toString(),
                    type: "li"
                });
                this.unorderedList.addChild(item);

                let anchor = new Container({
                    id: count.toString(),
                    type: "a"
                });
                anchor.style({
                    display: "list-item",
                    position: "static",
                    color: this.dropConfig.color,
                    paddingLeft: "0.5em",
                    paddingRight: "0px",
                    paddingBottom: "0.5em",
                    paddingTop: "0.5em",
                    cursor: "pointer"
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

            this.style(config);
        }

        private itemClicked(e: curly.Event) {
            let element = e.target;

            this.dispatchEvent(new curly.Event(DropDown.CHANGE, this, element.id));

            this.unorderedList.style({
                opacity: "1"
            });

            this.unorderedList.addEventListener(this, curly.Container.TRANSITION_COMPLETE, this.hideList);
            this.unorderedList.to({
                duration: this.dropConfig.durationContract,
                delay: 0.3,
                toVars: {
                    opacity: "0"
                }
            });

        }

        itemOver(e: curly.Event) {
            let element = e.target;
            element.to({
                duration: this.dropConfig.durationIn,
                toVars: {
                    backgroundColor: this.dropConfig.backgroundColorHover,
                    color: this.dropConfig.colorHover
                }
            }); 
        }
 
        itemOut(e: curly.Event) {
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
                opacity: "0",
                top: "0px"
            });

            this.unorderedList.to({
                duration: this.dropConfig.durationExpand,
                toVars: {
                    alpha: 1,
                    y: this.button.height
                }
            });
            this.scopedEventHandler = (g: MouseEvent) => { this.closeDrop(g) };

            // ! Don't think this will work in IE8, need attachEvent or polyfill
            document.body.addEventListener("mousedown", this.scopedEventHandler, true);

            this.button.removeEventListener("mousedown", this.buttonClicked);
        }

        private closeDrop(e: MouseEvent) {
            // ! Don't think this will work in IE8, need attachEvent or polyfill
            document.body.removeEventListener("mousedown", this.scopedEventHandler, true);

            setTimeout(() => {
                this.button.addEventListener(this, "mousedown", this.buttonClicked);
            }, 10);
            this.unorderedList.addEventListener(this, curly.Container.TRANSITION_COMPLETE, this.hideList);
            this.unorderedList.to({
                duration: this.dropConfig.durationContract,
                toVars:
                {
                    opacity: "0",
                }
            });
        }

        private hideList() {
            this.unorderedList.removeEventListener(curly.Container.TRANSITION_COMPLETE, this.hideList);
            this.unorderedList.style({
                display: "none"
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