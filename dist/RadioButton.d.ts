import { Container } from './Container';
import { InputConfig } from './InputConfig';
export declare class RadioButton extends Container {
    static CLICK: string;
    private enabled;
    constructor(config?: InputConfig);
    readonly checked: boolean;
}
