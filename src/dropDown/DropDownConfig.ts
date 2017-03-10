module shiva {
    export interface DropDownConfig extends ContainerConfig {
        options: string[];
        label?: string;
        style?: DropStyleDeclaration;
    }
}