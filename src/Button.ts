import { Container } from './Container';
import { ObjectUtils } from './ObjectUtils';
import { Event } from './EventDispatcher';
import { Styles } from './Styles';
import { ButtonConfig } from './ButtonConfig';
import { ButtonStyleDeclaration } from './ButtonStyleDeclaration';
import { HoverStyleDeclaration } from './HoverStyleDeclaration';

export class Button extends Container {
    styles: ButtonStyleDeclaration;
    static CLICK: string = "click";
    static text: string = "Button";
    private enabled: boolean;
    private icon: Container;
    private stateOver: boolean;


    constructor(config?: ButtonConfig) {
        config = config || {};

        if (config.href) {
            config.type = "a";
        }
        else {
            config.type = "button";
        }

        let buttonLabel = Button.text;
        if (config.text) {
            buttonLabel = config.text;
            config.text = null;
        }


        super(config);

        this.stateOver = false;
        if (config.href) {
            this.href = config.href;
        }
        this.enabled = true;

        // copy default styles, copy config.style values, copy config values to the config object and then style the button with that object
        // this.config will also have values that are required later
        this.styles = ObjectUtils.merge({}, Styles.button);
        // for (let i in Styles.button) {
        //     this.styles[i] = Styles.button[i];
        // }

        if (config.styles) {
            config.styles.map((style) => {
                style = this.populateEmptyHoverStyles(style);
                this.styles = ObjectUtils.merge(this.styles, style);
            });
        }
        if (config.style) {
            config.style = this.populateEmptyHoverStyles(config.style);
            this.styles = ObjectUtils.merge(this.styles, config.style);
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

        this.styles.cursor = "pointer";

        this.addEventListener(this, "mouseover", this.over);
        this.addEventListener(this, "mouseout", this.out);

        // this.style(this.styles);

        super.style(this.styles);

    }

    showOutTransition(e: Event) {
        if (this.stateOver && this.enabled) {
            let event = <MouseEvent>e.sourceEvent;

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
                    this.over(null);
                }
            });
        }
    }

    over(e) {
        if (this.enabled) {
            this.stateOver = true;
            this.to({
                duration: this.styles.hover.durationIn,
                toVars: {
                    backgroundColor: this.styles.hover.backgroundColor,
                    color: this.styles.hover.color
                }
            });
        }
    }

    out(e) {
        if (this.enabled) {
            this.stateOver = false;
            this.to({
                duration: this.styles.hover.durationOut,
                toVars: {
                    backgroundColor: this.styles.backgroundColor,
                    color: this.styles.color
                }
            });
        }
    }


    click(e: MouseEvent) {
        if (this.enabled) {
            //this.out();
            var event = new Event(Button.CLICK, this, e);
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
        this.out(null);
    }

    style(_style: ButtonStyleDeclaration) {
        this.styles = ObjectUtils.merge(this.styles, _style);
        super.style(_style);
    }

    private populateEmptyHoverStyles(style: HoverStyleDeclaration): HoverStyleDeclaration {
        if (!this.styles.hover) {
            style.hover = {
                backgroundColor: style.backgroundColor,
                color: style.color
            }
        }
        else {
            if (!this.styles.hover.color) {
                style.hover.color = style.color;
            }
            if (!this.styles.hover.backgroundColor) {
                style.hover.backgroundColor = style.backgroundColor;
            }
        }
        return style;
    }
}
