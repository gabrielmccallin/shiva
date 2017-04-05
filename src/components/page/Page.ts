/// <reference path="../container/container.ts" />
module shiva {
    export interface Page extends Container {
        wake();
        sleep();
    }
}