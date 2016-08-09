module curly {
    export interface SelectConfig extends ContainerConfig {
        name?: string;
        options: string[];
    }
}