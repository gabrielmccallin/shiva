module shiva {
    export interface DropStyleDeclaration extends HoverStyleDeclaration {
        durationExpand?: number;
        durationContract?: number; 
        button?: ButtonConfig;
        drop?: DropStyleDeclaration;
        item?: HoverStyleDeclaration;
        caret?: StyleDeclaration;

    }
}