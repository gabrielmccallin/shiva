import { Event } from './EventDispatcher';

export class Observer {
    static addEventListener(scope: any, type: string, callback: (e) => void) {
        if (!this.observers[type]) {
            this.observers[type] = [];
        }
        this.observers[type].push({ scope, type, callback });
    }

    static removeEventListener(type: string, callback: (e) => void) {
        let indexOfClosureToRemove;
        for (let i = 0; i < this.observers[type].length; i++) {
            if (this.observers[type].callback === callback) {
                indexOfClosureToRemove = i;
                break;
            }
        }

        this.observers[type].splice(indexOfClosureToRemove, 1);
    }

    static dispatchEvent(evt: Event) {
        const type = evt.type;
        if (this.observers[type]) {
            for (const i of this.observers[type]) {
                i.callback.call(i.scope, evt);
            }
        }
    }

    private static observers = {};
}