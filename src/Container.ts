import { ObjectUtils } from './ObjectUtils';
import { Properties } from './Properties';
import { Dimensions } from './Dimensions';
import { Event, EventDispatcher } from './EventDispatcher';
import { ContainerConfig, ResponsiveConfig } from './ContainerConfig';
import { StyleDeclaration } from './StyleDeclaration';
import { TransitionToConfig } from './TransitionToConfig';
import { TransitionFromToConfig } from './TransitionFromToConfig';
import Promise from 'promise-polyfill';



/**
 * Container (TypeScript)
 * - Container
 *
 * @version 0.1.5
 * @author Gabriel McCallin
 * @license MIT License
 **/


export class Container extends EventDispatcher {
    static TRANSITION_COMPLETE = "TRANSITION_COMPLETE";
    private _element: HTMLElement;
    private _data: any;
    private transitions: {} = {};
    private responsiveRules: ResponsiveConfig[] | ResponsiveConfig;

    constructor(config?: ContainerConfig) {
        super();
        if (config) {

            if (config.root && (!document.getElementById("app"))) {
                this._element = document.createElement("div");

                // recommended properties
                this._element.style.position = "absolute";
                this._element.style.height = "100%";
                this._element.style.width = "100%";
                this._element.style.top = "0px";
                this._element.style.left = "0px";
                this._element.style.margin = "0px";
                this._element.id = "app";

                document.body.appendChild(this._element);
            }
            else {
                if (config.type) {
                    this._element = document.createElement(config.type);
                }
                else {
                    this._element = document.createElement("div");
                }
            }
            if (config.id) {
                this._element.id = config.id;
            }

            if (config.text) {
                this.innerHtml = config.text;
            }

            for (let key in config.attributes) {
                this._element.setAttribute(key, config.attributes[key]);
            }

            this._data = config.data;

            if (config.styles) {
                config.styles.forEach((style) => {
                    this.style(style);
                });
            }

            this.style(config.style);

            if (config.className) {
                if (typeof config.className === 'string') {
                    this.className(<string>config.className);
                }
                else {
                    this.className(...<string[]>config.className);
                }
            }

            // style all other config
            this.style(config);

            if (config.responsive) {
                this.responsive(config.responsive);
            }
        }
        else {
            this._element = document.createElement("div");
        }
    }


    addToBody() {
        document.body.appendChild(this._element);
    }

    style(vars: StyleDeclaration) {
        Properties.style(this._element, vars);
    }

    className(...names: string[]) {
        const className = names.reduce((acc, val) => {
            return acc + " " + val;
        });
        if (!this._element.className) {
            this._element.className = className;
        }
        else {
            this._element.className = this._element.className + " " + className;
        }
    }

    appendChild(child: Container) {
        let childElement: HTMLElement;
        if (child.element) {
            childElement = child.element;
        }
        this._element.appendChild(childElement);
    }

    addChild(child: Container) {
        this.appendChild(child);
    }

    removeChild(child: Container) {
        if (this._element === child.element.parentNode) {
            this._element.removeChild(child.element);
        }
    }

    to(config: TransitionToConfig): Promise<Container> {
        let delay = 10;
        if (config.delay) {
            delay = config.delay * 1000;
        }

        setTimeout(() => {
            for (let i in config.toVars) {
                let vo = {};

                if (config.duration >= 0) {
                    vo["duration"] = config.duration;
                }

                if (this.transitions[i]) {
                    vo["count"] = this.transitions[i].count + 1;
                }
                else {
                    vo["count"] = 0;
                }

                this.transitions[i] = vo;

            }

            this.style({
                transition: this.convertTransitionObjectToString(this.transitions)
            });

            if (config.ease) {
                this.style({
                    transitionTimingFunction: config.ease.toString()
                });
            }

            this.style(config.toVars);
        }, delay);

        if (config.resolve) {
            setTimeout(() => {
                this.style({
                    transition: this.removeCompletedTransitionsAndReapply(config.toVars)
                });
                this.dispatchEvent(new Event("TRANSITION_COMPLETE", this));
                config.resolve();
            }, (config.duration * 1000) + delay);

            // !!
            return null;
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.style({
                        transition: this.removeCompletedTransitionsAndReapply(config.toVars)
                    });
                    resolve();
                    this.dispatchEvent(new Event("TRANSITION_COMPLETE", this));
                }, (config.duration * 1000) + delay);
            });
        }
    }

    private convertTransitionStyleToObject(style: CSSStyleDeclaration): {} {
        if (style.transitionProperty) {

            let transitionProps = style.transitionProperty.split(",");
            let transitionDuration = style.transitionDuration.split(",");
            let transitionDelay = style.transitionDelay.split(",");

            let transitionObject = {};

            let count = 0;
            transitionProps.map((prop) => {
                let propNoSpace = prop.replace(/^\s/g, "");
                propNoSpace = this.hyphenToCamel(propNoSpace);

                let vo = {};
                let duration = transitionDuration[count].replace(/^\s/g, "");

                if (transitionDuration[count]) {
                    vo["duration"] = transitionDuration[count].replace(/^\s/g, "").replace("s", "");
                }

                if (transitionDelay[count]) {
                    let trimTransitionDelayValue = transitionDelay[count].replace(/^\s/g, "").replace("s", "");
                    if (trimTransitionDelayValue !== ("initial" || "inherit")) {
                        vo["delay"] = trimTransitionDelayValue;
                    }
                }
                transitionObject[propNoSpace] = vo;

                count++;
            });
            return transitionObject;

        }
        else {
            return {};
        }
    }

    private convertTransitionObjectToString(transition: {}): string {
        let transitionString = "";
        for (let i in transition) {

            if (transitionString !== "") {
                transitionString += ", ";
            }
            let hyphenCaseIndex = this.camelToHyphen(i);
            transitionString += hyphenCaseIndex + " " + transition[i]["duration"] + "s";

            if (transition[i]["delay"]) {
                transitionString += " " + transition[i]["delay"] + "s";
            }
        }

        return transitionString;
    }

    private removeCompletedTransitionsAndReapply(toVars: {}): string {
        for (let i in toVars) {
            if (this.transitions[i]) {
                if (this.transitions[i].count > 0) {
                    this.transitions[i].count--;
                }
                else {
                    delete this.transitions[i];
                }
            }
        }

        return this.convertTransitionObjectToString(this.transitions);
    }

    fromTo(config: TransitionFromToConfig): Promise<Container> {
        if (config.delay) {
            config.delay = config.delay * 1000;
            if (config.immediateRender) {
                this.style(config.fromVars);
            }
        }
        else {
            this.style(config.fromVars);
            config.delay = 10;
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {

                this.style(config.fromVars);
                setTimeout(() => {
                    this.to({
                        duration: config.duration,
                        ease: config.ease,
                        toVars: config.toVars,
                        resolve: resolve
                    });
                }, 10);
            }, config.delay);
        });
    }

    private camelToHyphen(camel): string {
        return camel.replace(/[a-z][A-Z]/g, (match, index) => {
            let matchArray = match.split("");
            matchArray[2] = matchArray[1];
            matchArray[1] = "-";
            matchArray[2] = matchArray[2].toLowerCase();

            let result = "";
            matchArray.map((char) => {
                result += char;
            });
            return result;
        });

    }

    private hyphenToCamel(hyphen): string {
        return hyphen.replace(/-([a-z])/g, (match, index) => {
            return match[1].toUpperCase();
        });
    }

    addEventListener(scope: any, typeStr: string, listenerFunc: Function, data?: any, useCapture = false): void {
        let that = this;
        let scopedEventListener: EventListener = function (e) {
            listenerFunc.apply(scope, [new Event(typeStr, that, data, e)]);
        };

        super.addEventListener(scope, typeStr, listenerFunc, data, useCapture, scopedEventListener);
        if (this._element.addEventListener) {
            // Firefox, Google Chrome and Safari (and Opera and Internet Explorer from
            // version 9).
            this._element.addEventListener(typeStr, scopedEventListener, useCapture);
        } else if (this._element["attachEvent"]) {
            // Opera and Explorer (version < 9).
            this._element["attachEvent"]('on' + typeStr, scopedEventListener);

            this._element["attachEvent"]("onpropertychange", function (e: any) {
                if (e.eventType === typeStr) {
                    e.cancelBubble = true;
                    e.returnValue = false;
                    e.data = e.customData;
                    scopedEventListener(e);
                }
            });
        }
    }

    removeEventListener(typeStr: string, listenerFunc: Function): {} {
        let listener: any = super.removeEventListener(typeStr, listenerFunc);
        if (listener) {

            if (this._element.removeEventListener) {
                // Firefox, Google Chrome and Safari (and Opera and Internet Explorer from
                // version 9).
                this._element.removeEventListener(typeStr, listener.scopedEventListener, listener.useCapture);
            } else if (this._element["detachEvent"]) {
                // Opera and Explorer (version < 9).
                this._element["detachEvent"]('on' + typeStr, <EventListener>listenerFunc);
            }
        }

        return listener;
    }

    preventDefault(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }

    responsive(config: ResponsiveConfig | ResponsiveConfig[]) {
        this.responsiveRules = config;
        this.addResizeListener();
        this.resizeHandler(null);
    }

    private addResizeListener() {
        window.addEventListener("resize", event => {
            this.resizeHandler(event);
        });
    }

    private resizeHandler(e: UIEvent) {
        const width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        let mergedRules: StyleDeclaration = {};
        let duration = 0;
        if (this.responsiveRules.constructor === Array) {
            const rulesArray = <ResponsiveConfig[]>this.responsiveRules;
            for (let index = 0; index < rulesArray.length; index++) {
                const rule = rulesArray[index];
                if (rule.duration) {
                    duration = rule.duration;
                }
                mergedRules = this.calculateResponsiveStyles(width, rule, mergedRules);
            }
        }
        else {
            const rule = <ResponsiveConfig>this.responsiveRules;
            if (rule.duration) {
                duration = rule.duration;
            }
            mergedRules = this.calculateResponsiveStyles(width, rule);

        }
        if (duration === 0) {
            this.style(mergedRules);
        }
        else {
            this.to({
                duration: duration,
                toVars: mergedRules
            })
        }
    }

    private calculateResponsiveStyles(width: number, rule: ResponsiveConfig, mergedRules: StyleDeclaration = {}): StyleDeclaration {

        if (rule.maxWidth && rule.maxWidth !== 0) {
            if (width < rule.maxWidth) {
                if (rule.minWidth || rule.minWidth === 0) {
                    if (width > rule.minWidth) {
                        mergedRules = ObjectUtils.merge(mergedRules, rule.style);
                    }
                }
                else {
                    mergedRules = ObjectUtils.merge(mergedRules, rule.style);
                }
            }
        }
        else {
            if (rule.minWidth || rule.minWidth === 0) {
                if (width > rule.minWidth) {
                    mergedRules = ObjectUtils.merge(mergedRules, rule.style);
                }
            }
        }
        return mergedRules;
    }

    get width(): number {
        return this.shadow().width;
    }

    set width(w: number) {
        this.style({ width: w });
    }

    get height(): number {
        return this.shadow().height;
    }

    set height(h: number) {
        this.style({ height: h });
    }

    get y(): number {
        return this._element.offsetTop;
    }

    get x(): number {
        return this._element.offsetLeft;
    }

    set y(yPos: number) {
        this.style({ y: yPos });
    }

    set x(xPos: number) {
        this.style({ x: xPos });
    }

    get alpha(): number {
        return parseFloat(this._element.style.opacity);
    }

    set alpha(value: number) {
        this.style({ opacity: value.toString() });
    }

    set data(_data: any) {
        this._data = _data;
    }

    get data() {
        return this._data;
    }

    get innerText(): string {
        return this._element.innerText;
    }

    set innerText(text: string) {
        this._element.innerText = text;
    }

    hide() {
        this.style({ display: "none" });
    }

    show() {
        this.style({ display: "block" });
    }

    fillContainer() {
        this.style({
            minWidth: "100%",
            minHeight: "100%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            position: "relative"
        });
    }

    centreHorizontal() {
        this.style({
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative"
        });
    }

    centreHorizontalText() {
        this.style({
            textAlign: "center"
        });
    }

    private shadow(): Dimensions {
        if (!document.body.contains(this._element)) {
            const parent = this._element.parentElement;
            document.body.appendChild(this._element);

            const dimensions = this.dimensionsPolyfill();

            document.body.removeChild(this._element);

            if (parent) {
                parent.appendChild(this._element);
            }
            else {
                document.body.removeChild(this._element);
            }

            return dimensions;
        }
        else {

            return this.dimensionsPolyfill();
        }

    }

    private dimensionsPolyfill(): Dimensions {

        let height = this._element.getBoundingClientRect().height;
        let width = this._element.getBoundingClientRect().width;

        if (width && height) {
        }
        else {
            // fallback to scrollwidth and scrollheight
            width = this._element.scrollWidth;
            height = this._element.scrollHeight;
        }

        let dimensions = new Dimensions(width, height);
        return dimensions;
    }

    get value(): string {
        let inputElement = <HTMLInputElement>this._element;
        return inputElement.value;
    }

    set value(_value: string) {
        let inputElement = <HTMLInputElement>this._element;
        inputElement.value = _value;
    }

    get id(): string {
        return this._element.id;
    }

    set id(identifier: string) {
        this._element.id = identifier;
    }

    get element(): HTMLElement {
        return this._element;
    }

    set innerHtml(html: string) {
        this._element.innerHTML = html;
    }

    get innerHtml(): string {
        return this._element.innerHTML;
    }

    set href(link: string) {
        let element = <HTMLAnchorElement>this._element;
        element.href = link;
    }

    get href(): string {
        let element = <HTMLAnchorElement>this._element;
        return element.href;
    }
}
