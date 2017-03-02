module shiva {
    export interface DropDownConfig extends ContainerConfig {
        options: string[];
        button?: ButtonConfig;
        drop?: DropConfig;
        item?: StyleDeclaration;
        caret?: StyleDeclaration;
    }
}