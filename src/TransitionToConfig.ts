module shiva {
    export interface TransitionToConfig {
        duration: number;
        toVars: StyleDeclaration;
        ease?: Ease;
        delay?: number;
        immediateRender?: boolean;
        resolve?: Function;
    }
}