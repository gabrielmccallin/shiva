module curly {
    export class Observer {
        private static observers = {};

        static addEventListener(scope: any, type: string, callback: Function) {
            if (!this.observers[type]) {
                this.observers[type] = [];
            }
            this.observers[type].push({ scope: scope, type: type, callback: callback });
        }


        static removeEventListener(type: string, callback: Function) {
            var indexOfClosureToRemove;
            for (var i = 0; i < this.observers[type].length; i++) {
                if (this.observers[type].callback === callback) {
                    indexOfClosureToRemove = i;
                    break;
                }
            }

            this.observers[type].splice(indexOfClosureToRemove, 1);
        }

        static dispatchEvent(evt: curly.Event) {
            var type = evt.type;
            if (this.observers[type]) {
                for (var i = 0; i < this.observers[type].length; i++) {
                    this.observers[type][i].callback.call(this.observers[type][i].scope, evt);
                }
            }
            else {
                console.log("DISPATCH ERROR: NO OBSERVER REGISTERED");
            }
        }
    }
}
 