import { StyleDeclaration } from './StyleDeclaration';
export interface InputConfig extends StyleDeclaration {
    id?: string;
    style?: StyleDeclaration;
    checked?: boolean;
}
