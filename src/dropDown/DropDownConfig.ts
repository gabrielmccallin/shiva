module curly {
    export interface DropDownConfig extends ContainerConfig {
        options: string[];
        button?: ButtonConfig;
        drop?: DropConfig;
        caret?: StyleDeclaration;
    }
}