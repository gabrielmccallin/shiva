import { GEvent } from './GEvent';
export class Container extends GEvent {

    constructor() {
        super();

        console.log("hey there cowgirl!!!!");  

    }

    method() {
        console.log("public method"); 
    }
}