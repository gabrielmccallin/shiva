import { StyleDeclaration } from './StyleDeclaration';
export interface PagesConfig {
    pages: {};
    id?: string;
    style?: StyleDeclaration;
    delayTransition?: number;
    routes?: boolean;
    errorPage?: string;
    redirect?: boolean;
}
