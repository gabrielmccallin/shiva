import { ContainerConfig } from './ContainerConfig';
import { StyleDeclaration } from './StyleDeclaration';

export interface ImageConfig extends ContainerConfig {
    // TODO deprecate path
    path?: any;
    src?: any;
}