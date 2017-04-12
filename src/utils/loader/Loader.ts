/// <reference path="../../components/container/eventdispatcher.ts" />

module shiva {
    export type LoaderHTTPMethods = "GET" | "PUT" | "POST" | "DELETE" | "UPDATE";
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

        static get(config: LoaderConfig): Promise<any> {
            return this.load(config, this.httpMethods.GET);
        }

        static post(config: LoaderConfig): Promise<any> {
            return this.load(config, this.httpMethods.POST);
        }

        static put(config: LoaderConfig): Promise<any> {
            return this.load(config, this.httpMethods.PUT);
        }

        static update(config: LoaderConfig): Promise<any> {
            return this.load(config, this.httpMethods.UPDATE);
        }

        static delete(config: LoaderConfig): Promise<any> {
            return this.load(config, this.httpMethods.DELETE);
        }

        private static load(config: LoaderConfig, method: LoaderHTTPMethods): Promise<any> {
            return new Promise((resolve, reject) => {
                const http = new XMLHttpRequest();

                if (method === Loader.httpMethods.GET) {
                    config.url = config.url + this.concatParams(config.params);
                }

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

                http.onload = () => this.handleResponse(http, resolve, reject, config.data);
                http.onerror = () => reject(new Error("Network Error"));
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


        private static handleResponse(http: XMLHttpRequest, resolve: Function, reject: Function, data?: any) {
            // if (http.readyState === 4) {
                // http.onreadystatechange = undefined;
                if (http.status === 200) {
                    // let event: LoaderEvent = new LoaderEvent(Loader.COMPLETE, this, http.responseText, http.status, http, data);

                    return resolve(http.responseText);
                }
                else {
                    let error: string;
                    if (http.status === 0) {
                        error = "Network Error 0x2ee7";
                    }
                    else {
                        error = http.statusText;
                    }
                    // let event: LoaderEvent = new LoaderEvent(Loader.ERROR, this, error, http.status, http);

                    return reject(new Error(error));
                }
            // }
        }
    }

}
