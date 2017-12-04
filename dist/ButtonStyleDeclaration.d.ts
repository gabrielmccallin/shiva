import { StyleDeclaration } from './StyleDeclaration';
import { HoverStyle } from './HoverStyle';
export interface ButtonStyleDeclaration extends StyleDeclaration {
    hover?: HoverStyle;
}
