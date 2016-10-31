module shiva {
    export interface ButtonConfig extends HoverStyleDeclaration {
        id?: string;
        href?: string;
        target?: string;
        style?: ButtonIconConfig;
        text?: string;
        data?: any;
        icon?: ButtonIconConfig;
        type?: string;
    }
}