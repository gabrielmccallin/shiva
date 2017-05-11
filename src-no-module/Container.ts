/// <reference path="GEvent.ts" />

namespace shiva {
    export class Container extends GEvent {

        constructor() {
            super();

            console.log("hey");

        }

        method() {
            console.log("public method");
        }
    }
}