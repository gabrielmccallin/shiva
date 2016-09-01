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
        private _data: any;
        private _sourceEvent: any;
        private _sourceData: any;

        constructor(type: string, targetObj: any, data?: any, sourceEvent?: any) {
            this._type = type;
            this._target = targetObj;
            this._sourceEvent = sourceEvent;
            this._data = data;
        }

        get target(): Container {
            return this._target;
        }

        // getTarget(): any {
        //     return this._target;
        // }

        get type(): string {
            return this._type;
        }

        get data(): any {
            return this._data;
        }

        get sourceEvent(): any {
            return this._sourceEvent;
        }

        set sourceData(data:any){
            this._sourceData = data;
        }

        get sourceData(): any {
            return this._sourceData;
        }
    }

    export class EventDispatcher {
        private _listeners: any[] = [];

        hasEventListener(type: string, listener: Function): Boolean {
            var exists: Boolean = false;
            for (var i = 0; i < this._listeners.length; i++) {
                if (this._listeners[i].type === type && this._listeners[i].listener === listener) {
                    exists = true;
                }
            }

            return exists;
        }

        addEventListener(scope: any, typeStr: string, listenerFunc: Function, data?:any, useCapture = false, scopedEventListener: Function = undefined): void {
            if (this.hasEventListener(typeStr, listenerFunc)) { 
                return;
            }

            this._listeners.push({
                scope: scope,
                type: typeStr,
                listener: listenerFunc,
                useCapture: useCapture,
                scopedEventListener: scopedEventListener,
                sourceData: data
            });
        }

        removeEventListener(typeStr: string, listenerFunc: Function): {} {
            let listener = this._listeners.filter(item => {
                return (item.type === typeStr && item.listener.toString() === listenerFunc.toString());
            });

            this._listeners = this._listeners.filter(item => {
                return (!(item.type === typeStr && item.listener.toString() === listenerFunc.toString()));
            });

            return listener[0];
        }

        dispatchEvent(evt: Event) {
            for (var i = 0; i < this._listeners.length; i++) {
                if (this._listeners[i].type === evt.type) {
                    if(this._listeners[i].sourceData){
                        evt.sourceData = this._listeners[i].sourceData;
                    }
                    this._listeners[i].listener.call(this._listeners[i].scope, evt);
                }
            }
        }
    }
}