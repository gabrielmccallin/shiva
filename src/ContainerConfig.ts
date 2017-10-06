﻿import { StyleDeclaration } from './StyleDeclaration';

export interface ContainerConfig extends StyleDeclaration {
    root?: boolean;
    id?: string;
    type?: string;

    /**
     * Takes a shiva.StyleDeclaration
    */
    style?: StyleDeclaration;

    /**
     * Takes an array of shiva.StyleDeclarations
    */
    styles?: StyleDeclaration[];

    text?: string;
    data?: any;
    className?: string | string[];
    attributes?: { name: string, value: string }[];
    responsive?: ResponsiveConfig | ResponsiveConfig[];
}

export interface ResponsiveConfig {
    minWidth?: number;
    maxWidth?: number;
    style: StyleDeclaration;
    duration?: number;
}
