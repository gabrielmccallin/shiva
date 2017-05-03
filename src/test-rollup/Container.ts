import { EventD } from './EventDispatcher'

/**
 * shiva.Container (TypeScript)
 * - Container
 *
 * @version 0.1.5
 * @author Gabriel McCallin
 * @license MIT License
 **/

export module shiva {
    class Container extends EventD {
        constructor() {
            super();

            console.log("Container");

        }


        method() {
            console.log("public method");
        }
    }
}