import { Event } from './EventDispatcher';

export class Bus {
    static addEventListener(scope: any, type: string, callback: (e) => void) {
        if (!this['listeners']) {
            this['listeners'] = {};
        }
        if (!this['listeners'][type]) {
            this['listeners'][type] = [];
        }
        this['listeners'][type].push({ scope, type, callback });
    }

    static removeEventListener(type: string, callback: (e) => void) {
        if (this['listeners'] && this['listeners'][type]) {
            let indexOfClosureToRemove;
            for (let i = 0; i < this['listeners'][type].length; i++) {
                if (this['listeners'][type].callback === callback) {
                    indexOfClosureToRemove = i;
                    break;
                }
            }

            this['listeners'][type].splice(indexOfClosureToRemove, 1);
        }
    }

    static dispatchEvent(evt: Event) {
        if (this['listeners']) {
            const type = evt.type;
            if (this['listeners'][type]) {
                for (const iterator of this['listeners'][type]) {
                    iterator.callback.call(iterator.scope, evt);
                }
            }
        }
    }
}