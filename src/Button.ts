import { ButtonConfig } from './ButtonConfig';
import { ButtonStyleDeclaration } from './ButtonStyleDeclaration';
import { Container } from './Container';
import { Event } from './EventDispatcher';
import { ObjectUtils } from './ObjectUtils';
import { Styles } from './Styles';

export class Button extends Container {
    static CLICK: string = "click";
    private styles: ButtonStyleDeclaration;
    private enabled: boolean;
    private icon: Container;
    private stateOver: boolean;

    constructor(config: ButtonConfig = {}) {
        config = ObjectUtils.merge(ObjectUtils.merge({}, Styles.button), config);
        super(config);

        this.stateOver = false;
        this.enabled = true;
        this.styles = Styles.button;

        // find hover and default colours and keep them in this class
        if (config) {
            this.styles = config;

            if (config.styles) {
                config.styles.map((style) => {
                    ObjectUtils.merge(this.styles, style);
                });
            }
            if (config.style) {
                ObjectUtils.merge(this.styles, config.style);
            }
        }

        this.addEventListener(this, "mouseover", this.over);
        this.addEventListener(this, "mouseout", this.out);
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

    click() {
        if (this.enabled) {
            var event = new Event(Button.CLICK, this);
            this.dispatchEvent(event);
        }
    }

    disable() {
        this.enabled = false;
        this.style({ cursor: "default" });
        this.element.setAttribute("disabled", "true");
    }

    select() {
        this.enabled = false;
        this.style({ cursor: "default" });
    }

    enable() {
        this.enabled = true;
        this.style({ cursor: "pointer" });
        this.element.removeAttribute("disabled");
    }

    style(style: ButtonStyleDeclaration) {
        ObjectUtils.merge(this.styles, style);
        super.style(style);
    }
}
