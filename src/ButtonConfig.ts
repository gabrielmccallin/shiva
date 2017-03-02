module shiva {
    export interface ButtonConfig extends HoverStyleDeclaration {
        id?: string;
        href?: string;
        target?: string;
        style?: ButtonConfig;
        text?: string;
        data?: any;
        icon?: ButtonIconConfig;
        type?: string;
    }
}