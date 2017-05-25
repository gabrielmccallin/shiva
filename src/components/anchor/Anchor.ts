import { Container } from '../container/Container';
import { AnchorConfig } from './AnchorConfig';

export class Anchor extends Container {

    constructor(config: AnchorConfig) {
        config.type = "a";
        super(config);

        let element = <HTMLAnchorElement>this.element;
        element.href = config.href;
    }
}