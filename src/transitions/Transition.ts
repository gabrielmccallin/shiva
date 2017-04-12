module shiva {
    export class Transition {
        private callback: Function = () => { console.error("transition not set") };
        private data: any;

        constructor() {

        }

        then(callback: Function, data?: any): Transition {
            this.callback = callback;
            return new Transition();
        }

        execute() {
            if (this.callback) {
                this.callback(this.data);
            }

        }

        printCallback(): Transition {
            return this;
        }
    }
}