import { HoverStyleDeclaration } from './HoverStyleDeclaration';
import { StyleDeclaration } from './StyleDeclaration';
export interface DropStyleDeclaration extends HoverStyleDeclaration {
    durationExpand?: number;
    durationContract?: number;
    button?: HoverStyleDeclaration;
    item?: HoverStyleDeclaration;
    caret?: StyleDeclaration;
    dropGap?: string;
}
