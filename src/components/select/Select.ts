﻿import { Container } from '../container/Container';
import { SelectConfig } from './SelectConfig';

export class Select extends Container {
    static CHANGE = "change";

    constructor(config: SelectConfig) {
        config.type = "select";
        super(config);

        let element = <HTMLSelectElement>this.element;
        if (config.name) {
            element.name = config.name;
        }


        let options = config.options;
        options.map((option) => {
            let item = new Container({
                text: option,
                type: "option"
            });
            this.addChild(item);
        });
    }

    get value(): string {
        let element = <HTMLSelectElement>this.element;
        return element.value;

    }

    get selectedIndex(): number {
        let element = <HTMLSelectElement>this.element;
        return element.selectedIndex;

    }

}