import { Container } from './Container';
export declare class ShivaEvent {
    private _type;
    private _target;
    private _data;
    private _sourceEvent;
    constructor(type: string, targetObj: any, data?: any, sourceEvent?: any);
    readonly target: Container;
    readonly type: string;
    data: any;
    readonly sourceEvent: any;
}
