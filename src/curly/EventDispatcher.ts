/**
 * EventDispatcher (TypeScript)
 * - Simple extendable event dispatching class
 *
 * @version 0.1.5
 * @author John Vrbanac
 * @license MIT License
 **/

module curly {
    export class Event {
        private _type: string;
        private _target: any;
        private data: any;

        constructor(type: string, targetObj: any, data?:any) {
            this._type = type;
            this._target = targetObj;
            this.data = data;
        }

        getTarget(): any {
            return this._target;
        }

        getType(): string {
            return this._type;
        }

        getData(): any {
            return this.data;
        }
    }

    export class EventDispatcher {
        _listeners: any[];
        constructor() {
            this._listeners = [];
        }

        hasEventListener(type: string, listener: Function): Boolean {
            var exists: Boolean = false;
            for (var i = 0; i < this._listeners.length; i++) {
                if (this._listeners[i].type === type && this._listeners[i].listener === listener) {
                    exists = true;
                }
            }

            return exists;
        }

        addEventListener(scope:any, typeStr: string, listenerFunc: Function): void {
            if (this.hasEventListener(typeStr, listenerFunc)) {
                return;
            }

            this._listeners.push({ scope:scope, type: typeStr, listener: listenerFunc });
        }

        removeEventListener(typeStr: string, listenerFunc: Function): void {
            for (var i = 0; i < this._listeners.length; i++) {
                if (this._listeners[i].type === typeStr && this._listeners[i].listener === listenerFunc) {
                    this._listeners.splice(i, 1);
                }
            }
        }

        dispatchEvent(evt: Event) {
            for (var i = 0; i < this._listeners.length; i++) {
                if (this._listeners[i].type === evt.getType()) {
                    this._listeners[i].listener.call(this._listeners[i].scope, evt);
                }
            }
        }
    }
}