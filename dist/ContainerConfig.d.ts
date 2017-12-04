import { StyleDeclaration } from './StyleDeclaration';
export interface ContainerConfig extends StyleDeclaration {
    root?: boolean;
    id?: string;
    type?: string;
    style?: StyleDeclaration;
    styles?: StyleDeclaration[];
    text?: string;
    data?: any;
    className?: string | string[];
    attributes?: {};
    responsive?: ResponsiveConfig | ResponsiveConfig[];
}
export interface ResponsiveConfig {
    minWidth?: number;
    maxWidth?: number;
    style: StyleDeclaration;
    duration?: number;
}
