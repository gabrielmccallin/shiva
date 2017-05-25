import { StyleDeclaration } from '../../components/container/StyleDeclaration';
import { HoverStyle } from '../../components/container/HoverStyle';

export interface ButtonStyleDeclaration extends StyleDeclaration {
    hover?: HoverStyle,
    icon?: {
        code: string;
        align?: string;
        style?: StyleDeclaration;
    }
}