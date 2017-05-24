import { GEvent } from './GEvent';
import Promise from 'promise-polyfill';

export class Container extends GEvent {

    constructor() {
        super();

        console.log("hey there cowgirl!!!!");

    }

    method(): Promise <Container> {
        console.log("public method");
        return new Promise();
    }
}