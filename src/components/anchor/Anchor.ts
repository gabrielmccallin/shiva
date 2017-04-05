/// <reference path="../container/container.ts" />
module shiva {
    export class Anchor extends Container {

        constructor(config:AnchorConfig) {
            config.type = "a";
            super(config);
            
            let element = <HTMLAnchorElement>this.element;
            element.href = config.href; 
        }
    }
}