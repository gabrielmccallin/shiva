module curly {
    export class Transition {
        private callback: Function;

        constructor() {

        }

        then(callback): Transition {
            this.callback = callback;

            return this;
        }

        execute() {
            // console.log("transition execute");
            if (this.callback) {
                this.callback();
            }

        }
    }
}