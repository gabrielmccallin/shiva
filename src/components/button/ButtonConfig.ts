import { ContainerConfig } from '../../components/container/ContainerConfig';
import { ButtonStyleDeclaration } from './ButtonStyleDeclaration';

export interface ButtonConfig extends ContainerConfig {
    href?: string;
    target?: string;
    style?: ButtonStyleDeclaration;
    styles?: ButtonStyleDeclaration[];
}