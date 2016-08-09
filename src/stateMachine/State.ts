module curly {
    export module stateMachine {
        export interface State extends Container {
            hydrate();
        }
    }
}