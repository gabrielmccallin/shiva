module shiva {
    export interface ContainerConfig {
        root?: boolean;
        id?: string;
        type?: string;
        style?: StyleDeclaration | StyleDeclaration[];
        text?: string;
        data?: any;
    }
}