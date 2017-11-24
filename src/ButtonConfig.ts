import { ContainerConfig } from './ContainerConfig';
import { ButtonStyleDeclaration } from './ButtonStyleDeclaration';
import { HoverStyleDeclaration } from './HoverStyleDeclaration';

export interface ButtonConfig extends ContainerConfig, HoverStyleDeclaration {
    style?: ButtonStyleDeclaration;
    styles?: ButtonStyleDeclaration[];
}