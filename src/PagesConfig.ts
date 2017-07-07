import { StyleDeclaration } from './StyleDeclaration';

export interface PagesConfig {
    pages: {};
    id?: string;
    style?: StyleDeclaration;
    delayTransition?: number;
    routes?: boolean;
    /**
     * Specify an error view if address not found 
    */
    errorPage?: string;
    /**
     * Redirect to / if address not found
    */
    redirect?: boolean;
}