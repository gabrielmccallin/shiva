import { Container } from './Container';
import { PagesConfig } from './PagesConfig';
export declare class Pages extends Container {
    private currentPage;
    private config;
    private pages;
    private currentPageName;
    private zIndex;
    private delayTimeout;
    private routes;
    constructor(config: PagesConfig);
    update(page: string): void;
    changePage(page: string): void;
}
