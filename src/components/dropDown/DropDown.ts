import { Container } from '../container/Container';
import { Button } from '../button/Button';
import { ObjectUtils } from '../../utils/ObjectUtils';
import { Styles } from '../../components/Styles';
import { Event } from '../../components/container/EventDispatcher';
import { DropDownConfig } from './DropDownConfig';
import { DropStyleDeclaration } from './DropStyleDeclaration';
import { HoverStyleDeclaration } from '../../components/container/HoverStyleDeclaration';


export class DropDown extends Container {
    static CHANGE = "change";
    private button: Button;
    private caret: Container;
    private unorderedList: Container;
    private scopedEventHandler: EventListener;
    private items: Container[];
    private buttonStyle: HoverStyleDeclaration;
    private dropStyle: DropStyleDeclaration;
    private itemStyle: HoverStyleDeclaration;
    private durationExpand: number;
    private durationContract: number;


    constructor(config: DropDownConfig) {
        super({
            id: config.id || "drop-down"
        });

        this.items = [];

        this.buttonStyle = ObjectUtils.merge({}, Styles.drop);
        if (config.styles) {
            config.styles.map(style => {
                this.buttonStyle = ObjectUtils.merge(this.buttonStyle, style);
                if (style.button) {
                    this.buttonStyle = ObjectUtils.merge(this.buttonStyle, style.button);
                }
            });
        }
        if (config.style) {
            this.buttonStyle = ObjectUtils.merge(this.buttonStyle, config.style);
            if (config.style.button) {
                this.buttonStyle = ObjectUtils.merge(this.buttonStyle, config.style.button);
            }
        }

        this.buttonStyle.zIndex = "1337";


        this.button = new Button({
            style: this.buttonStyle,
            text: config.text
        });

        this.addChild(this.button);

        let caretStyle = ObjectUtils.merge({}, Styles.drop.caret);
        if (config.styles) {
            config.styles.map(style => {
                if (style.color) {
                    caretStyle.borderTopColor = style.color;
                }
                if (style.caret) {
                    caretStyle = ObjectUtils.merge(caretStyle, style.caret);
                }
            });
        }
        if (config.style) {
            if (config.style.color) {
                caretStyle.borderTopColor = config.style.color;
            }
            if (config.style.caret) {
                caretStyle = ObjectUtils.merge(caretStyle, config.style.caret);
            }
        }

        this.caret = new Container({
            id: "drop-caret",
            style: caretStyle
        });


        this.button.addChild(this.caret);
        this.button.addEventListener(this, "mouseup", this.buttonClicked);
        this.button.addEventListener(this, "mouseover", this.buttonOver);
        this.button.addEventListener(this, "mouseout", this.buttonOut);


        this.dropStyle = ObjectUtils.merge({}, Styles.drop);
        if (config.styles) {
            config.styles.map(style => {
                this.dropStyle = ObjectUtils.merge(this.dropStyle, style);
            });
        }
        if (config.style) {
            this.dropStyle = ObjectUtils.merge(this.dropStyle, config.style);
        }


        this.unorderedList = new Container({
            type: "ul",
            styles: [
                this.dropStyle,
                {
                    listStyle: "none",
                    zIndex: "1336",
                    position: "absolute",
                    overflow: "hidden",
                    padding: "0rem",
                    marginTop: this.dropStyle.dropGap
                }
            ]
        });

        this.addChild(this.unorderedList);


        // take root style
        this.itemStyle = ObjectUtils.merge({}, Styles.drop);
        // but not the border
        this.itemStyle.borderStyle = "";
        this.itemStyle.borderWidth = "";
        this.itemStyle.borderColor = "";
        this.itemStyle.borderImage = "";

        if (config.styles) {
            config.styles.map(style => {
                // take root style
                this.itemStyle = ObjectUtils.merge(this.itemStyle, style);
                // but not the border
                this.itemStyle.borderStyle = "";
                this.itemStyle.borderWidth = "";
                this.itemStyle.borderColor = "";
                this.itemStyle.borderImage = "";

                if (style.item) {
                    this.itemStyle = ObjectUtils.merge(this.itemStyle, style.item);
                }
            });
        }
        if (config.style) {
            // take root style
            this.itemStyle = ObjectUtils.merge(this.itemStyle, config.style);
            // but not the border
            this.itemStyle.borderStyle = "";
            this.itemStyle.borderWidth = "";
            this.itemStyle.borderColor = "";
            this.itemStyle.borderImage = "";

            if (config.style.item) {
                this.itemStyle = ObjectUtils.merge(this.itemStyle, config.style.item);
            }
        }


        let count = 0;

        config.options.map((option) => {
            const item = new Container({
                data: option,
                type: "li",
                text: option,
                styles: [
                    this.itemStyle,
                    {
                        display: "list-item",
                        cursor: "pointer"
                    }
                ]
            });
            this.unorderedList.addChild(item);

            // let anchor = new Container({
            //     id: count.toString(),
            //     type: "a",
            //     styles: [
            //         this.itemStyle,
            //         {
            //             display: "list-item",
            //             cursor: "pointer"
            //         }
            //     ]
            // });

            this.items.push(item);

            // anchor.innerHtml = option;

            item.addEventListener(this, "mouseover", this.itemOver);
            item.addEventListener(this, "mouseout", this.itemOut);
            item.addEventListener(this, "mouseup", this.itemClicked);

            // item.addChild(anchor);
            count++;

        });

        // pickup drop colour styles if not specified for the item for the hover out functions
        if (!this.itemStyle.backgroundColor) {
            this.itemStyle.backgroundColor = this.dropStyle.backgroundColor;
        }

        if (!this.itemStyle.color) {
            this.itemStyle.color = this.dropStyle.color;
        }

        this.unorderedList.style({
            display: "none"
        });

        this.style({
            position: "relative"
        });

        this.durationContract = Styles.drop.durationContract;
        this.durationExpand = Styles.drop.durationExpand;

        if (config.styles) {
            config.styles.map(style => {
                if (style.durationExpand) {
                    this.durationExpand = style.durationExpand;
                }
                if (style.durationContract) {
                    this.durationContract = style.durationContract;
                }
            });
        }

        if (config.style) {
            if (config.style.durationExpand) {
                this.durationExpand = config.style.durationExpand;
            }

            if (config.style.durationContract) {
                this.durationContract = config.style.durationContract;
            }
        }
    }


    private buttonOver(e: Event) {
        if (this.buttonStyle.hover) {
            this.caret.to({
                duration: this.buttonStyle.hover.durationIn,
                toVars: {
                    borderTopColor: this.buttonStyle.hover.color,
                }
            });
        }
    }

    private buttonOut(e: Event) {
        if (this.buttonStyle.hover) {
            this.caret.to({
                duration: this.buttonStyle.hover.durationOut,
                toVars: {
                    borderTopColor: this.buttonStyle.color,
                }
            });
        }
    }

    private itemClicked(e: Event) {
        let element = e.target;

        this.dispatchEvent(new Event(DropDown.CHANGE, this, element.data));

        this.unorderedList.style({
            opacity: "1"
        });

        this.unorderedList.to({
            duration: this.durationContract,
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
            duration: this.itemStyle.hover.durationIn,
            toVars: {
                backgroundColor: this.itemStyle.hover.backgroundColor,
                color: this.itemStyle.hover.color,
            }
        });
    }

    itemOut(e: Event) {
        let element = e.target;
        element.to({
            duration: this.itemStyle.hover.durationOut,
            toVars: {
                backgroundColor: this.itemStyle.backgroundColor,
                color: this.itemStyle.color
            }
        });
    }

    private buttonClicked(e: Event) {
        this.unorderedList.style({
            display: "block",
            // opacity: "0",
        });

        this.unorderedList.fromTo({
            duration: this.durationExpand,
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
        document.addEventListener("mouseup", this.scopedEventHandler, true);

        this.button.removeEventListener("mouseup", this.buttonClicked);
    }

    private closeDrop(e: MouseEvent) {
        // ! Don't think this will work in IE8, need attachEvent or polyfill
        document.removeEventListener("mouseup", this.scopedEventHandler, true);

        setTimeout(() => {
            this.button.addEventListener(this, "mouseup", this.buttonClicked);
        }, 10);
        this.unorderedList.to({
            duration: this.durationContract,
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