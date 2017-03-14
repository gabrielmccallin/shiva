module shiva {
    export interface ButtonConfig extends HoverStyleDeclaration {
        id?: string;
        href?: string;
        target?: string;
        style?: ButtonConfig;
        label?: string;
        data?: any;
        icon?: ButtonIconConfig;
        type?: string;
    }
}