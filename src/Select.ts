import { Container } from './Container';
import { SelectConfig } from './SelectConfig';

export class Select extends Container {
    static CHANGE = "change";

    constructor(config: SelectConfig) {
        config.type = "select";
        super(config);

        const element = <HTMLSelectElement>this.element;
        if (config.name) {
            element.name = config.name;
        }

        config.options.forEach((option) => {
            const item = new Container({
                text: option.text,
                type: "option",
                attributes: {
                    'value': option.value
                }
            });
            this.addChild(item);
        });
    }

    get value(): string {
        let element = <HTMLSelectElement>this.element;
        return element.value;
    }

    set value(_value: string) {
        let element = <HTMLSelectElement>this.element;
        element.value = _value;
    }

    get selectedIndex(): number {
        let element = <HTMLSelectElement>this.element;
        return element.selectedIndex;

    }

    set selectedIndex(selectedIndex: number) {
        let element = <HTMLSelectElement>this.element;
        element.selectedIndex = selectedIndex;
    }

}