/// <reference path="../container/HoverStyle.ts" />
/// <reference path="../container/StyleDeclaration.ts" />

module shiva {
    export interface ButtonStyleDeclaration extends StyleDeclaration {
        hover?: HoverStyle,
        icon?: {
            code: string;
            align?: string;
            style?: StyleDeclaration;
        }
    }
}