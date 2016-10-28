/// <reference path="properties.ts" />
/// <reference path="EventDispatcher.ts" />
/// <reference path="../typings/promise.d.ts" />


/**
 * curly.Container (TypeScript)
 * - Container
 *
 * @version 0.1.5
 * @author Gabriel McCallin
 * @license MIT License
 **/


module curly {
    export class Container extends EventDispatcher {
        static TRANSITION_COMPLETE = "TRANSITION_COMPLETE";
        private _element: HTMLElement;
        private transitions: {} = {};

        constructor(config?: ContainerConfig) {
            super();
            if (config) {

                if (config.root) {
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

                this.style(config.style);
                this.style(config);
            }
            else {
                this._element = document.createElement("div");

            }
            // seen some issues with the default static
            // this._element.style.position = "relative";
        }


        addToBody() {
            document.body.appendChild(this._element);
        }

        style(vars: StyleDeclaration) {
            Properties.style(this._element, vars);
        }

        className(...names: string[]) {
            names.map((name => {
                this._element.className = name;
            }))
        }

        addChild(child: Container) {
            let childElement: HTMLElement;
            if (child.element) {
                childElement = child.element;
            }
            // else {
            //     childElement = <HTMLElement>child;
            // }


            this._element.appendChild(childElement);
        }

        removeChild(child: Container) {
            if (this._element === child.element.parentNode) {
                this._element.removeChild(child.element);
            }
        }

        to(config: TransitionToConfig): Promise<Container> {
            for (let i in config.toVars) {
                let vo = {};

                if (config.duration) {
                    vo["duration"] = config.duration;
                }

                if (config.delay) {
                    vo["delay"] = config.delay;
                }
                this.transitions[i] = vo;

            }

            let transitionString = this.convertTransitionObjectToString(this.transitions);

            if (config.delay) {
                config.delay = config.delay * 1000;
            }
            else {
                config.delay = 10;
            }

            setTimeout(() => {
                this.style({
                    transition: transitionString
                });

                if (config.ease) {
                    this.style({
                        transitionTimingFunction: config.ease.toString()
                    })
                }

                this.style(config.toVars);
            }, config.delay);

            if (config.resolve) {
                setTimeout(() => {
                    this.style({
                        transition: this.removeCompletedTransitionsAndReapply(config.toVars)
                    });
                    this.dispatchEvent(new Event("TRANSITION_COMPLETE", this));
                    config.resolve();
                }, (config.duration * 1000) + config.delay);
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
                    }, (config.duration * 1000) + config.delay);
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
                    delete this.transitions[i];
                }
            }

            return this.convertTransitionObjectToString(this.transitions);
        }

        fromTo(config: TransitionFromToConfig): Promise<Container> {
            if (config.delay) {
                config.delay = config.delay * 1000;
            }
            else {
                this.style(config.fromVars);
                config.delay = 10;
            }

            let promise = new Promise((resolve, reject) => {
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
            return promise;
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

                // let result = "";
                // matchArray.map((char) => {
                //     result += char;
                // });
                // return result;
            });
        }

        // from(duration: number, vars: Object): TweenLite {
        //     return TweenLite.from(this._element, duration, vars);
        // } 

        addEventListener(scope: any, typeStr: string, listenerFunc: Function, data?: any, useCapture = false): void {
            let that = this;
            let scopedEventListener: EventListener = function (e) {
                // console.log("captured at add", e); 
                listenerFunc.apply(scope, [new curly.Event(typeStr, that, data, e)]);
            };

            super.addEventListener(scope, typeStr, listenerFunc, data, useCapture, scopedEventListener);
            // add to element 
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

            if (this._element.removeEventListener) {
                // Firefox, Google Chrome and Safari (and Opera and Internet Explorer from
                // version 9).
                this._element.removeEventListener(typeStr, listener.scopedEventListener, listener.useCapture);
                // return true;
            } else if (this._element["detachEvent"]) {
                // Opera and Explorer (version < 9).
                this._element["detachEvent"]('on' + typeStr, <EventListener>listenerFunc);
            }

            return listener;
        }

        preventDefault(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
        }

        get width(): number {
            return this.shadow().width;
        }

        set width(w: number) {
            Properties.style(this._element, { width: w });
        }

        get height(): number {
            return this.shadow().height;
        }

        set height(h: number) {
            Properties.style(this._element, { height: h });
        }

        get y(): number {
            return this._element.offsetTop;
        }

        get x(): number {
            return this._element.offsetLeft;
        }

        set y(yPos: number) {
            Properties.style(this._element, { y: yPos });
        }

        set x(xPos: number) {
            Properties.style(this._element, { x: xPos });
        }

        get alpha(): number {
            return parseFloat(this._element.style.opacity);
        }

        set alpha(value: number) {
            Properties.style(this._element, { opacity: value.toString() });
        }

        hide() {
            Properties.style(this._element, { display: "none" });
        }

        show() {
            Properties.style(this._element, { display: "block" });
        }

        fillContainer() {
            Properties.style(this._element, {
                minWidth: "100%",
                minHeight: "100%",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                position: "relative"
            });
        }

        centreHorizontal() {
            Properties.style(this._element, {
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative"
            });
        }

        centreHorizontalText() {
            Properties.style(this._element, {
                textAlign: "center"
                // width: "100%"
            });
        }

        private shadow(): Dimensions {
            if (!document.body.contains(this._element)) {
                let parent = this._element.parentElement;
                document.body.appendChild(this._element);

                let dimensions = this.dimensionsPolyfill();

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

        private dimensionsPolyfill(): curly.Dimensions {

            let height = this._element.getBoundingClientRect().height;
            let width = this._element.getBoundingClientRect().width;
            // width = this._element.scrollWidth;
            // height = this._element.scrollHeight;

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

} 