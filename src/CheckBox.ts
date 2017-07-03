import { Container } from './Container';
import { InputConfig } from './InputConfig';

export class CheckBox extends Container {
    static CLICK: string = "click";
    private enabled: boolean;


    constructor(config?: InputConfig) {
        super({
            type: "input"
        });

        let element = <HTMLInputElement>this.element;
        element.type = "checkbox";

        if (config) {
            if (config.id) {
                this.id = config.id;
            }
            this.style(config.style);
            //anything else in the config
            this.style(config);

            element.checked = config.checked;
        }
    }

    get checked(): boolean {
        let element = <HTMLInputElement>this.element;
        return element.checked;
    }
}