import { EventDispatcher } from './EventDispatcher';
import { LoaderConfig } from './LoaderConfig';
import Promise from 'promise-polyfill';
export declare type LoaderHTTPMethods = "GET" | "PUT" | "POST" | "DELETE" | "UPDATE";
export declare class Loader extends EventDispatcher {
    static httpMethods: {
        GET: LoaderHTTPMethods;
        PUT: LoaderHTTPMethods;
        POST: LoaderHTTPMethods;
        DELETE: LoaderHTTPMethods;
        UPDATE: LoaderHTTPMethods;
    };
    static COMPLETE: string;
    static ERROR: string;
    static get(config: LoaderConfig): Promise<any>;
    static post(config: LoaderConfig): Promise<any>;
    static put(config: LoaderConfig): Promise<any>;
    static update(config: LoaderConfig): Promise<any>;
    static delete(config: LoaderConfig): Promise<any>;
    private static load(config, method);
    private static concatParams(params);
    private static handleResponse(http, resolve, reject, data?);
}
