import { ContainerConfig } from './ContainerConfig';
export interface SelectConfig extends ContainerConfig {
    name?: string;
    options: {
        value: string;
        text: string;
    }[];
}
