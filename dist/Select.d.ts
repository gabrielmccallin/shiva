import { Container } from './Container';
import { SelectConfig } from './SelectConfig';
export declare class Select extends Container {
    static CHANGE: string;
    constructor(config: SelectConfig);
    private addOptions(options);
    value: string;
    selectedIndex: number;
    options: Array<{
        value: string;
        text: string;
    }>;
}
