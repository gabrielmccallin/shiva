import { ButtonConfig } from './ButtonConfig';
import { ButtonStyleDeclaration } from './ButtonStyleDeclaration';
import { Container } from './Container';
export declare class Button extends Container {
    static CLICK: string;
    private styles;
    private enabled;
    private icon;
    private stateOver;
    constructor(config?: ButtonConfig);
    over(): void;
    out(): void;
    click(): void;
    disable(): void;
    select(): void;
    enable(): void;
    style(style: ButtonStyleDeclaration): void;
}
