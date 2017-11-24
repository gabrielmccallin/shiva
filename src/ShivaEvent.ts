/**
 * Event (TypeScript)
 * - Event class
 *
 * @version 0.1.5
 * @author
 * @license MIT License
 **/
import { Container } from './Container';

export class ShivaEvent {
    private _type: string;
    private _target: any;
    private _data: any;
    private _sourceEvent: any;

    constructor(type: string, targetObj: any, data?: any, sourceEvent?: any) {
        this._type = type;
        this._target = targetObj;
        this._sourceEvent = sourceEvent;
        this._data = data;
    }

    get target(): Container {
        return this._target;
    }

    get type(): string {
        return this._type;
    }

    get data(): any {
        return this._data;
    }

    set data(payload: any) {
        this._data = payload;
    }

    get sourceEvent(): any {
        return this._sourceEvent;
    }

}