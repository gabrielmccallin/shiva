module shiva {
    export class Transition {
        private callback: Function = ()=>{console.log("not set")};
        private data: any;

        constructor() {

        }

        then(callback:Function, data?:any): Transition {
            this.callback = callback;

            console.log("callback: ", this.callback);

            return new Transition();
        }

        execute() {
            // console.log("transition execute");
            if (this.callback) {
                this.callback(this.data);
            }

        }

        printCallback():Transition {

            return this;
        }
    }
}