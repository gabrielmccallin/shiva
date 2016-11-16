module shiva {
    export class Pages extends Container {
        private currentPage: Page;
        private config: PagesConfig;
        private pages: any = {};
        private currentPageName: string;
        private zIndex = 100;
        private delayTimeout: number;

        constructor(config: PagesConfig) {
            super({
                id: config.id,
                position: "relative"
            });
            this.config = config;
            this.style(config.style);
        }

        update(pageName: string) {
            if (pageName !== this.currentPageName) {
                if (this.config.pages[pageName]) {
                    clearTimeout(this.delayTimeout);
                    this.currentPageName = pageName;
                    if (this.currentPage) {
                        if (this.currentPage.sleep) {
                            this.currentPage.sleep();
                        }
                        if (this.config.delayTransition) {
                            let viewToRemove = this.currentPage;
                            this.delayTimeout = setTimeout(() => {
                                this.removeChild(viewToRemove);
                            }, this.config.delayTransition * 1000);
                        }
                        else {
                            this.removeChild(this.currentPage);
                        }
                    }

                    if (this.pages[pageName]) {
                    }
                    else {
                        let page = new this.config.pages[pageName](pageName);
                        this.pages[pageName] = page;
                    }

                    this.currentPage = <Page>this.pages[pageName];
                    if (this.currentPage.wake) {
                        this.currentPage.wake();
                    }
                    this.currentPage.style({
                        position: "absolute",
                        width: "100%",
                        top: "0px",
                        left: "0px"
                    });
                    this.addChild(this.currentPage);

                }
                else {
                    // console.log("no view defined called: ", state);
                }
            }
            else {
                console.log("view already loaded: ");
            }
        }
    }
}