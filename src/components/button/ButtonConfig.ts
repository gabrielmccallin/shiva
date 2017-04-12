module shiva {
    export interface ButtonConfig extends ContainerConfig {
        href?: string;
        target?: string;
        style?: ButtonStyleDeclaration;
        styles?: ButtonStyleDeclaration[];
    }
}