/// <reference path="eventdispatcher.ts" />
/// <reference path="LoaderHTTPMethods.ts" />

module shiva {
    // export type httpMethods = "GET" | "PUT" | "POST" | "DELETE" | "UPDATE";
    export class Loader extends EventDispatcher {
        static httpMethods = {
            GET: "GET" as LoaderHTTPMethods,
            PUT: "PUT" as LoaderHTTPMethods,
            POST: "POST" as LoaderHTTPMethods,
            DELETE: "DELETE" as LoaderHTTPMethods,
            UPDATE: "UPDATE" as LoaderHTTPMethods
        };
        static COMPLETE: string = "COMPLETE";
        static ERROR: string = "ERROR";
        // static GET: string = "GET";
        // static PUT: string = "PUT";
        // static POST: string = "POST";
        // static UPDATE: string = "UPDATE";
        private _data: any;
        private http: XMLHttpRequest;
        private resolve: any | PromiseLike<any>;
        private reject: any;


        constructor() {
            super();
        }


        load(config: LoaderConfig): Promise<any> {
            if (this.http) {
                this.http.abort();
            }
            else {
                this.http = new XMLHttpRequest();
            }

            if (config.method === Loader.httpMethods.GET) {
                config.url = config.url + this.concatParams(config.params);
            }

            let methodString;
            switch (config.method) {
                case Loader.httpMethods.GET:
                    methodString = "GET";
                    break;
                case Loader.httpMethods.POST:
                    methodString = "POST";
                    break;
                case Loader.httpMethods.PUT:
                    methodString = "PUT";
                    break;
                case Loader.httpMethods.UPDATE:
                    methodString = "UPDATE";
                    break;
                default:
                    methodString = "GET";
                    break;
            }

            this._data = config.data;

            this.http.open(methodString, config.url, true);
            this.http.timeout = 20000;
            //this.http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');  
            if (config.headers) {
                config.headers.map(header => {
                    this.http.setRequestHeader(header.value, header.variable);
                });
            }
            //if (!cache) {
            //    this.http.setRequestHeader("If-Modified-Since", "Sat, 01 Jan 2005 00:00:00 GMT");
            //}

            this.http.onreadystatechange = this.handleResponse.bind(this);
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
                this.http.send(config.params);
            });


        }

        private concatParams(params: {}): string {
            let queryString: string = "?";
            for (var i in params) {
                if (params.hasOwnProperty(i)) {
                    queryString = queryString.concat(i, "=", encodeURI(params[i]), "&");
                }
            }
            queryString = queryString.slice(0, -1);
            return queryString;
        }

        private setRequestHeader(header: any) {
            this.http.setRequestHeader(header.value, header.variable);
        }


        private handleResponse() {
            if (this.http.readyState === 4) {
                if (this.http.status === 200) {
                    let event: LoaderEvent = new LoaderEvent(Loader.COMPLETE, this, this.http.responseText, this.http.status, this.http, this._data);
                    super.dispatchEvent(event);

                    // this.resolve(this.http.responseText);
                    this.resolve(event);

                    this.http.onreadystatechange = undefined;
                }
                else {
                    let error: string;
                    if (this.http.status === 0) {
                        error = "Network Error 0x2ee7";
                    }
                    else {
                        error = this.http.statusText;
                    }
                    let event: LoaderEvent = new LoaderEvent(Loader.ERROR, this, error, this.http.status, this.http);
                    super.dispatchEvent(event);

                    this.reject({
                        error: error,
                        status: this.http.status
                    });
                }
            }
        }
    }

}
