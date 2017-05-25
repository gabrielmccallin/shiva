import { Container } from '../container/Container';
import { Page } from './Page';
import { PagesConfig } from './PagesConfig';

export class Pages extends Container {
    private currentPage: Page;
    private config: PagesConfig;
    private pages: any = {};
    private currentPageName: string;
    private zIndex = 100;
    private delayTimeout: number;
    private routes: boolean = true;

    constructor(config: PagesConfig) {
        super({
            id: config.id,
            style: {
                position: "relative"
            }
        });
        this.config = config;
        this.style(config.style);

        if (config.routes === false) {
            this.routes = false;
        }

        if (this.routes) {
            window.addEventListener('popstate', (event) => {
                let page: string;
                if (event.state === null) {
                    page = window.location.pathname;
                }
                else {
                    page = event.state;
                }
                this.changePage(page);
            });

            // GO !!!
            this.changePage(window.location.pathname);
        }
    }

    update(page: string) {
        page = decodeURIComponent(page);
        if (page !== this.currentPageName) {
            if (this.routes) {
                history.pushState(null, null, page);
            }
            this.changePage(page);
        }
        else {
            // console.log("view already loaded: ");
        }
    }

    changePage(page: string) {
        this.currentPageName = page;
        if (this.config.pages[page]) {
            clearTimeout(this.delayTimeout);
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

            if (this.pages[page]) {
            }
            else {
                let pageTemp = new this.config.pages[page](page);
                this.pages[page] = pageTemp;
            }

            this.currentPage = <Page>this.pages[page];
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
            // no view defined, falling back 
            if (this.config.redirect) {
                this.update("/");
            }
            else {
                if (this.config.errorPage) {
                    this.changePage(this.config.errorPage);
                }
            }
        }
    }
}