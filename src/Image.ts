import { Container } from './Container';
import { ContainerConfig } from './ContainerConfig';
import { ImageConfig } from './ImageConfig';

export class Image extends Container {

    static COMPLETE: string = "load";
    static ERROR: string = "error";

    constructor(config: ImageConfig = {}) {
        config.type = "img";

        let src: string;
        if (config.path) {
            src = config.path;
            config.path = null;
        }
        if (config.src) {
            src = config.src;
            config.src = null;
        }

        super(config);
        this.load(src);
    }

    load(src: string) {
        this.element.setAttribute("src", src);
    }
}