import { Event } from './EventDispatcher';
export declare class LoaderEvent extends Event {
    private _response;
    private _status;
    private _httpMetaData;
    constructor(type: string, targetObj: any, response: any, status: any, httpMetaData: any, data?: any, sourceEvent?: any);
    readonly response: string;
    readonly status: string;
    readonly httpMetaData: any;
}
