import { Container } from './Container';
export declare class Event {
    private _type;
    private _target;
    private _data;
    private _sourceEvent;
    constructor(type: string, targetObj: any, data?: any, sourceEvent?: any);
    readonly target: Container;
    readonly type: string;
    data: any;
    readonly sourceEvent: any;
}
export declare class EventDispatcher {
    private _listeners;
    hasEventListener(type: string, listener: Function): Boolean;
    addEventListener(scope: any, typeStr: string, listenerFunc: Function, data?: any, useCapture?: boolean, scopedEventListener?: Function): void;
    removeEventListener(typeStr: string, listenerFunc: Function): {};
    dispatchEvent(evt: Event): void;
}
