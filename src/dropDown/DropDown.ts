/// <reference path="../container.ts" />
module shiva {
    export class DropDown extends Container {
        static CHANGE = "change";
        private button: Button;
        private unorderedList: Container;
        private scopedEventHandler: EventListener;
        private items: Container[];
        private dropConfig: DropConfig;
        private padding: string;


        constructor(config: DropDownConfig) {
            config.position = "relative";
            config.id = config.id || "drop-down";

            super(config);

            this.items = [];

            this.button = new Button({
                style: config.button,
                zIndex: "1337"                
            });
            this.addChild(this.button);

            let caret = new shiva.Container({
                id: "drop-caret",
                style: Styles.caret
            });

            if (config.caret) {
                caret.style(config.caret);
            }

            this.button.addChild(caret);
            this.button.addEventListener(this, "mousedown", this.buttonClicked);

            this.dropConfig = {};

            for (let i in Styles.drop) {
                this.dropConfig[i] = Styles.drop[i];
            }

            for (let i in config.drop) {
                this.dropConfig[i] = config.drop[i];
            }

            this.unorderedList = new Container({
                type: "ul",
                style: Styles.drop
            });

            if (config.drop) {
                this.unorderedList.style(config.drop);
            }



            this.addChild(this.unorderedList);

            let count = 0;

            config.options.map((option) => {
                let item = new Container({
                    id: count.toString(),
                    type: "li",
                });
                this.unorderedList.addChild(item);

                let anchor = new Container({
                    id: count.toString(),
                    type: "a",
                    style: Styles.listItem
                });
                if (config.item) {
                    anchor.style(config.item);
                }

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

            // this.style(config);
        }

        private itemClicked(e: shiva.Event) {
            let element = e.target;

            this.dispatchEvent(new shiva.Event(DropDown.CHANGE, this, element.id));

            this.unorderedList.style({
                opacity: "1"
            });

            this.unorderedList.addEventListener(this, shiva.Container.TRANSITION_COMPLETE, this.hideList);
            this.unorderedList.to({
                duration: this.dropConfig.durationContract,
                delay: 0.3,
                toVars: {
                    opacity: "0"
                }
            });

        }

        itemOver(e: shiva.Event) {
            let element = e.target;

            element.to({
                duration: this.dropConfig.durationIn,
                toVars: {
                    backgroundColor: this.dropConfig.backgroundColorHover,
                    color: this.dropConfig.colorHover
                }
            });
        }

        itemOut(e: shiva.Event) {
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
                    y: this.button.height - 2
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
            this.unorderedList.addEventListener(this, shiva.Container.TRANSITION_COMPLETE, this.hideList);
            this.unorderedList.to({
                duration: this.dropConfig.durationContract,
                toVars:
                {
                    opacity: "0",
                }
            });
        }

        private hideList() {
            this.unorderedList.removeEventListener(shiva.Container.TRANSITION_COMPLETE, this.hideList);
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