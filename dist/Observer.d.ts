import { Event } from './EventDispatcher';
export declare class Observer {
    private static observers;
    static addEventListener(scope: any, type: string, callback: Function): void;
    static removeEventListener(type: string, callback: Function): void;
    static dispatchEvent(evt: Event): void;
}
