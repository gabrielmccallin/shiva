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

        this.addOptions(config.options);
    }

    private addOptions(options: Array<{value: string, text: string}>) {
        const element = <HTMLSelectElement>this.element;
        options.forEach((option) => {
            const item = new Container({
                text: option.text,
                type: "option",
                attributes: {
                    'value': option.value
                }
            });
            this.appendChild(item);
        });
    }

    get value(): string {
        const element = <HTMLSelectElement>this.element;
        return element.value;
    }

    set value(_value: string) {
        const element = <HTMLSelectElement>this.element;
        element.value = _value;
    }

    get selectedIndex(): number {
        const element = <HTMLSelectElement>this.element;
        return element.selectedIndex;
    }

    set selectedIndex(selectedIndex: number) {
        const element = <HTMLSelectElement>this.element;
        element.selectedIndex = selectedIndex;
    }

    get options(): Array<{value: string, text: string}> {
        const element = <HTMLSelectElement>this.element;
        const options = [];

        for (var i = 0; i < element.options.length; i++) {
            const elem = element.options[i];
            options.push({value: elem.value, text: elem.text});
        }

        return options;
    }

    set options(options: Array<{value: string, text: string}>) {
        const element = <HTMLSelectElement>this.element;

        element.innerHTML = ''; // remove existing options

        this.addOptions(options);
    }

}