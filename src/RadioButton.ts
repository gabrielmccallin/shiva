/// <reference path="container.ts" />
module shiva {
    export class RadioButton extends Container {
        static CLICK: string = "click";
        private enabled: boolean;


        constructor(config?: InputConfig) {
            super({
                type: "input"
            });

            let element = <HTMLInputElement>this.element;
            element.type = "radio";

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
}