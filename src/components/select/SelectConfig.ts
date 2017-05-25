import { ContainerConfig } from '../../components/container/ContainerConfig';

export interface SelectConfig extends ContainerConfig {
    name?: string;
    options: string[];
}