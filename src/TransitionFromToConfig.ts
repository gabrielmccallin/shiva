module curly {
    export interface TransitionFromToConfig extends TransitionToConfig {
        fromVars: StyleDeclaration;
    }
}