module shiva {
    export interface DropStyleDeclaration extends HoverStyleDeclaration {
        durationExpand?: number;
        durationContract?: number; 
        button?: HoverStyleDeclaration;
        // drop?: DropStyleDeclaration;
        item?: HoverStyleDeclaration;
        caret?: StyleDeclaration;
        dropGap?: string;

    }
}