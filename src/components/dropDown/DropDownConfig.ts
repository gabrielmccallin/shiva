module shiva {
    export interface DropDownConfig extends ContainerConfig {
        options: string[];
        style?: DropStyleDeclaration;
        styles?: DropStyleDeclaration[];
    }
}