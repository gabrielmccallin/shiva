module shiva {
    export interface ContainerConfig extends StyleDeclaration {
        root?: boolean;
        id?: string;
        type?: string;
        style?: StyleDeclaration;
        text?: string;
        data?: any;
    }
}