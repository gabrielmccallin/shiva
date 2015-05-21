///<reference path="EventDispatcher.ts"/>
/// <reference path="properties.ts" />
/// <reference path="../greensock.d.ts" />

module curly {
    export class Container extends EventDispatcher {
        element: HTMLElement;

        constructor(id: string, type?: string);
        constructor(id: string, type?: boolean);
        constructor(id: string, type?: any) {
            super();
            if (type) {
                if (typeof type == "boolean") {
                    this.element = document.createElement("div");
                    document.body.appendChild(this.element);
                }
                else {
                    this.element = document.createElement(type);                    
                }
            }
            else {
                this.element = document.createElement("div");
            }
            this.element.id = id;

            this.set({
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                display: "block"
            });
        }


        addToBody() {
            document.body.appendChild(this.element);
        }

        set(vars: Object) {
            curly.Properties.set(this.element, vars);
        }

        addChild(child) {
            var childElement: HTMLElement;
            if (child.element) {
                childElement = child.element;
            }
            else {
                childElement = child;
            }


            this.element.appendChild(childElement);
        }

        removeChild(child) {
            if (this.element === child.element.parentNode) {
                this.element.removeChild(child.element);
            }
        }

        to(duration: number, vars: Object) {
            TweenMax.to(this.element, duration, vars);
        }


        fromTo(duration: number, fromVars: Object, toVars: Object) {
            TweenMax.fromTo(this.element, duration, fromVars, toVars);
        }

        addDomEventListener(scope: any, typeStr: string, listenerFunc: Function) {
            var scopedEventHandler: EventListener = scope ? function (e) { listenerFunc.apply(scope, [e]); } : <EventListener>listenerFunc;

            this._listeners.push({ scope: scope, type: typeStr, listener: listenerFunc, scopedEventHandler: scopedEventHandler });

            if (this.element.addEventListener) {
                // Firefox, Google Chrome and Safari (and Opera and Internet Explorer from
                // version 9).
                this.element.addEventListener(typeStr, scopedEventHandler, false);
            } else if (this.element.attachEvent) {
                // Opera and Explorer (version < 9).
                this.element.attachEvent('on' + typeStr, scopedEventHandler);

                this.element.attachEvent("onpropertychange", function (e: any) {
                    if (e.eventType == typeStr) {
                        e.cancelBubble = true;
                        e.returnValue = false;
                        e.data = e.customData;
                        scopedEventHandler(e);
                    }
                });
            } else {
            }
        }

        removeDomEventListener(typeStr: string, listenerFunc: Function): any {

            for (var i = 0; i < this._listeners.length; i++) {
                if (this._listeners[i].type === typeStr && this._listeners[i].listener === listenerFunc) {

                    if (this.element.removeEventListener) {
                        // Firefox, Google Chrome and Safari (and Opera and Internet Explorer from
                        // version 9).
                        this.element.removeEventListener(typeStr, this._listeners[i].scopedEventHandler, false);
                        return true;
                    } else if (this.element.detachEvent) {
                        // Opera and Explorer (version < 9).
                        return this.element.detachEvent('on' + typeStr, <EventListener>listenerFunc);
                    } else {
                        return false;
                    }
                    this._listeners.splice(i, 1);
                }
            }
        }


        preventDefault(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
        }

        get width(): number {
            return this.element.scrollWidth;
        }

        set width(w: number) {
            curly.Properties.set(this.element, { width: w });
        }

        get height(): number {
            return this.element.scrollHeight;
        }

        set height(h: number) {
            curly.Properties.set(this.element, { height: h });
        }

        get y(): number {
            return this.element.offsetTop;
        }

        get x(): number {
            return this.element.offsetLeft;
        }
    }
} 