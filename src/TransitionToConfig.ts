module curly {
    export interface TransitionToConfig {
        duration: number;
        toVars: StyleDeclaration;
        ease?: Ease;
        delay?: number;
        transition?: Transition;
    }
}