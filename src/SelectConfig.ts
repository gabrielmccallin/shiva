import { ContainerConfig } from './ContainerConfig';

export interface SelectConfig extends ContainerConfig {
    name?: string;
    options: string[];
}