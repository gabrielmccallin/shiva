import { Container } from './Container';
import { ObjectUtils } from './ObjectUtils';
import { Event } from './EventDispatcher';
import { Styles } from './Styles';
import { ButtonConfig } from './ButtonConfig';
import { ButtonStyleDeclaration } from './ButtonStyleDeclaration';
import { HoverStyleDeclaration } from './HoverStyleDeclaration';

export class Button extends Container {
    static CLICK: string = "click";
    static text: string = "Button";
    styles: ButtonStyleDeclaration;
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
            config.attributes = { type: 'button' };
        }

        let buttonLabel = Button.text;
        if (config.text || config.text === "") {
            buttonLabel = config.text;
            config.text = null;
        }

        super(config);

        this.stateOver = false;
        if (config.href) {
            this.href = config.href;
        }
        this.enabled = true;

        /* 
            Copy default styles, copy config.style values, copy config values to this.styles and then style the button with that object.
            this.styles will also have values that are required later, namely for rollover / rollout
        */
        this.styles = ObjectUtils.merge({}, Styles.button);

        if (config.styles) {
            config.styles.map((style) => {
                this.styles = ObjectUtils.merge(this.styles, style);
            });
        }
        if (config.style) {
            this.styles = ObjectUtils.merge(this.styles, config.style);
        }

        const label = document.createTextNode(buttonLabel);
        this.element.appendChild(label);

        this.styles.cursor = "pointer";

        this.addEventListener(this, "mouseover", this.over);
        this.addEventListener(this, "mouseout", this.out);

        super.style(this.styles);

    }

    over() {
        if (this.styles.hover) {
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
    }

    out() {
        if (this.styles.hover) {
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
    }

    click(e: MouseEvent) {
        if (this.enabled) {
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
        this.out();
    }

    style(_style: ButtonStyleDeclaration) {
        this.styles = ObjectUtils.merge(this.styles, _style);
        super.style(this.styles);
    }
}
