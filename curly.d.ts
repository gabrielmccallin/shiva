declare module curly {
    class Event {
        private _type;
        private _target;
        private data;
        constructor(type: string, targetObj: any, data?: any);
        public getTarget(): any;
        public getType(): string;
        public getData(): any;
    }
    class EventDispatcher {
        public _listeners: any[];
        constructor();
        public hasEventListener(type: string, listener: Function): Boolean;
        public addEventListener(scope: any, typeStr: string, listenerFunc: Function): void;
        public removeEventListener(typeStr: string, listenerFunc: Function): void;
        public dispatchEvent(evt: Event): void;
    }
}
declare module curly {
    class Properties {
        static set(object: any, vars: Object): void;
        private setWidth();
    }
}
declare module curly {
    class Container extends EventDispatcher {
        public element: HTMLElement;
        constructor(id: string, type?: string);
        constructor(id: string, type?: boolean);
        private shadow();
        public addToBody(): void;
        public set(vars: Object): void;
        public addChild(child: any): void;
        public removeChild(child: any): void;
        public to(duration: number, vars: Object): void;
        public fromTo(duration: number, fromVars: Object, toVars: Object): void;
        public addDomEventListener(scope: any, typeStr: string, listenerFunc: Function): void;
        public removeDomEventListener(typeStr: string, listenerFunc: Function): any;
        public preventDefault(e: any): void;
        public width : number;
        public height : number;
        public y : number;
        public x : number;
        public alpha : number;
    }
}
declare module curly {
    class ButtonVars {
        public id: string;
        public href: string;
        public target: string;
        public height: number;
        public width: number;
        constructor();
    }
}
declare module curly {
    class Button extends Container {
        static CLICK: string;
        private style;
        private enabled;
        private identifier;
        constructor(vars: ButtonVars);
        public init(): void;
        private overWithEnable(e);
        private outWithEnable(e);
        public over(): void;
        public out(): void;
        public click(): void;
        public disable(): void;
        public select(): void;
        public enable(): void;
        public setId(identifier: string): void;
    }
}
declare module curly {
    class Dimensions {
        public height: number;
        public width: number;
        constructor(width: number, height: number);
    }
}
declare module curly {
    class Image extends Container {
        constructor(id?: string);
        private loaded(e);
        private error(e);
        public load(path: string): void;
    }
}
declare module curly {
    class TextFieldVars {
        public text: string;
        public width: any;
        public height: any;
        public fontSize: string;
        public fontFamily: string;
        public fontWeight: string;
        public color: string;
        public id: string;
        public textAlign: string;
        constructor();
    }
}
declare module curly {
    class TextField extends Container {
        constructor(vars: TextFieldVars);
        public setText(text: string): void;
        public addText(text: string): void;
        public addBorder(thickness: number, style: string, colour: number): void;
    }
}
declare module curly {
    class Rectangle extends Container {
        constructor(width: any, height: number, colour: any, id?: string);
        public addBorder(thickness?: number, style?: string, colour?: string): void;
    }
}
declare module curly {
    class LabelButtonVars {
        public id: string;
        public text: string;
        public href: string;
        public target: string;
        public fontSize: string;
        public fontFamily: string;
        public fontWeight: string;
        public fontColourOver: string;
        public fontColourOut: string;
        public letterSpacing: string;
        public bgColourOut: string;
        public bgColourOver: string;
        public bgSelectedColour: string;
        public margin: number;
        public height: number;
        public cornerRadius: string;
        public width: number;
        public border: string;
        public borderThickness: number;
        public borderColour: string;
        public align: string;
        constructor();
    }
}
declare module curly {
    class LabelButton extends Button {
        private field;
        private bg;
        private vars;
        private selected;
        private btnWidth;
        private btnHeight;
        constructor(vars?: LabelButtonVars);
        public init(): void;
        public over(): void;
        public out(): void;
        public update(text: string): void;
        public disable(): void;
        public select(): void;
        public enable(): void;
        public height : number;
        public width : number;
    }
}
declare module curly {
    class Observer {
        private static observers;
        static addEventListener(scope: any, type: string, callback: Function): void;
        static removeEventListener(type: string, callback: Function): void;
        static dispatchEvent(evt: Event): void;
    }
}
declare module curly {
    class Resize {
        static proportionalOutside(objectWidth: number, objectHeight: number, areaWidth: number, areaHeight: number): {
            height: number;
            width: number;
        };
        static proportionalInside(objectWidth: number, objectHeight: number, areaWidth: number, areaHeight: number): Object;
    }
}
declare module curly {
    class URLLoader extends EventDispatcher {
        static COMPLETE: string;
        static ERROR: string;
        static GET: string;
        static PUT: string;
        static POST: string;
        static UPDATE: string;
        private http;
        constructor();
        public load(url: string, method: string, params: any, scope: any, headers?: any[], cache?: boolean): void;
        private setRequestHeader(header);
        public post(url: any, params: any, scope: any, cache?: boolean): void;
        private handleResponse();
    }
}
declare module curly {
    class Window {
        static scrollY(): number;
        static scrollX(): number;
        static height : number;
        static width : number;
    }
}
