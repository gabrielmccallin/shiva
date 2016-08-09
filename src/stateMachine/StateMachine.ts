module curly {
    export module stateMachine {
        export class StateMachine extends Container {
            private currentView: State;
            private config: StateMachineConfig;
            private views: any = {};
            private currentState: string = "";

            constructor(config: StateMachineConfig) {
                super({
                    id: config.id
                });
                this.config = config;
                this.style(config.style);
                this.style(config);
            }

            update(state: string) {
                if (state !== this.currentState) {
                    if (this.config.views[state]) {
                        this.currentState = state;
                        let to = {
                            top: "0px",
                            left: "0px",
                            duration: 0
                        };
                        let from = {
                            top: "0px",
                            left: "0px",
                            duration: 0
                        };

                        for (let i in this.config.to) {
                            to[i] = this.config.to[i];
                        }

                        for (let i in this.config.from) {
                            from[i] = this.config.from[i];
                        }

                        if (this.currentView) {
                            if (from.duration > 0) {
                                this.currentView.to(from.duration, { left: from.left, top: from.top, alpha: 0, onComplete: this.removeView, onCompleteScope: this, onCompleteParams: [this.currentView] });
                            }
                            else {
                                this.removeChild(this.currentView);
                            }
                        }

                        if (this.views[state]) {
                        }
                        else {
                            let view = new this.config.views[state]();
                            this.views[state] = view;
                        }

                        this.currentView = <State>this.views[state];
                        if (this.currentView.hydrate) {
                            this.currentView.hydrate();
                        }
                        this.addChild(this.currentView);
                        this.currentView.style({
                            alpha: 0
                        });

                        if (to.duration > 0) {
                            this.currentView.to(to.duration, { left: to.left, top: to.top, alpha: 1, onComplete: (view) => view.style({ display: "block" }), onCompleteParams: [this.currentView] });
                        }
                        else {
                            this.currentView.style({
                                opacity: "1",
                                display: "block",
                                top: to.top,
                                left: to.left
                            });
                        }
                    }
                    else {
                        console.log("no view defined called: ", state);
                    }
                }
                else {
                    console.log("view already loaded: ", state);
                }
            }

            private removeView(view: Container) {
                this.removeChild(view);
            }
        }
    }
}