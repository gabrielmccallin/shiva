module shiva {
    export module stateMachine {
        export interface StateMachineConfig extends StyleDeclaration {
            id?: string,
            style?: StyleDeclaration,
            to?: {
                duration?: number,
                top?: string,
                left?: string
            }
            from?: {
                duration?: number,
                top?: string,
                left?: string
            }
            views: {}
        }
    }
}