/// <reference path="../../components/container/eventdispatcher.ts" />
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
        // private _data: any;
        // private http: XMLHttpRequest;


        // constructor() {
        //     super();
        // }

        static get(config: LoaderConfig): Promise<any> {
            return this.load(config, this.httpMethods.GET);
        }


        private static load(config: LoaderConfig, method: LoaderHTTPMethods): Promise<any> {
            const http = new XMLHttpRequest();

            if (method === Loader.httpMethods.GET) {
                config.url = config.url + this.concatParams(config.params);
            }

            // this._data = config.data;

            http.open(method, config.url, true);
            http.timeout = 20000;
            //http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');  
            if (config.headers) {
                config.headers.map(header => {
                    http.setRequestHeader(header.value, header.variable);
                });
            }
            //if (!cache) {
            //    http.setRequestHeader("If-Modified-Since", "Sat, 01 Jan 2005 00:00:00 GMT");
            //}

            return new Promise((resolve, reject) => {
                http.onreadystatechange = () => this.handleResponse(http, resolve, reject, config.data);
                http.send(config.params);
            });
        }

        private static concatParams(params: {}): string {
            let queryString: string = "?";
            for (var i in params) {
                if (params.hasOwnProperty(i)) {
                    queryString = queryString.concat(i, "=", encodeURI(params[i]), "&");
                }
            }
            queryString = queryString.slice(0, -1);
            return queryString;
        }

        // private setRequestHeader(header: any) {
        //     this.http.setRequestHeader(header.value, header.variable);
        // }


        private static handleResponse(http: XMLHttpRequest, resolve: Function, reject: Function, data?: any) {
            if (http.readyState === 4) {
                http.onreadystatechange = undefined;
                if (http.status === 200) {
                    let event: LoaderEvent = new LoaderEvent(Loader.COMPLETE, this, http.responseText, http.status, http, data);
                    // super.dispatchEvent(event);

                    // this.resolve(http.responseText);

                    return resolve(event);
                }
                else {
                    let error: string;
                    if (http.status === 0) {
                        error = "Network Error 0x2ee7";
                    }
                    else {
                        error = http.statusText;
                    }
                    let event: LoaderEvent = new LoaderEvent(Loader.ERROR, this, error, http.status, http);
                    // super.dispatchEvent(event);

                    return reject(Error(error));
                }
            }
        }
    }

}
