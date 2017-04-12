module shiva {
    export class LoaderEvent extends Event {

        private _response: any;
        private _status: any;
        private _httpMetaData: any;


        constructor(type: string, targetObj: any, response: any, status: any, httpMetaData: any, data?: any, sourceEvent?: any) {
            super(type, targetObj, data, sourceEvent);

            this._response = response;
            this._status = status;
            this._httpMetaData = httpMetaData;

        }

        get response(): string {
            return this._response;
        }

        get status(): string {
            return this._status;
        }

        get httpMetaData(): any {
            return this._httpMetaData;
        }

    }
}