import { ContainerConfig } from './ContainerConfig';
import { DropStyleDeclaration } from './DropStyleDeclaration';
export interface DropDownConfig extends ContainerConfig {
    options: string[];
    style?: DropStyleDeclaration;
    styles?: DropStyleDeclaration[];
}
