import { Container } from './Container';
import { InputConfig } from './InputConfig';
export declare class CheckBox extends Container {
    static CLICK: string;
    private enabled;
    constructor(config?: InputConfig);
    readonly checked: boolean;
}
