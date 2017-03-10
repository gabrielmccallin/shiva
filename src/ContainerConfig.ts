module shiva {
    export interface ContainerConfig {
        root?: boolean;
        id?: string;
        type?: string;
        style?: StyleDeclaration;
        text?: string;
        data?: any;
    }
}