/// <reference path="LoaderHTTPMethods.ts" />

module shiva {
    export interface LoaderConfig {
        url: string; 
        method: LoaderHTTPMethods;
        params?: any; 
        headers?: Array<any>;
        cache?: boolean;
        data?: any;
    }
}