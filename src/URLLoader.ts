/// <reference path="eventdispatcher.ts" />
module curly {
    export class URLLoader extends EventDispatcher {
        static COMPLETE: string = "COMPLETE";
        static ERROR: string = "ERROR";
        static GET: string = "GET";
        static PUT: string = "PUT";
        static POST: string = "POST";
        static UPDATE: string = "UPDATE";
        private http: XMLHttpRequest;

        constructor() {
            super();
        }


        load(url: string, method: string, params?: any, headers?: Array<any>, cache?: boolean) {
            if (this.http) {
                this.http.abort();
            }
            else {
                this.http = new XMLHttpRequest();
            }

            if (method === curly.URLLoader.GET) {
                url = url + this.concatParams(params);
            }

            this.http.open(method, url, true);
            this.http.timeout = 20000;
            //this.http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');  
            if (headers) {
                headers.map(header => {
                    this.http.setRequestHeader(header.value, header.variable);
                });
            }
            //if (!cache) {
            //    this.http.setRequestHeader("If-Modified-Since", "Sat, 01 Jan 2005 00:00:00 GMT");
            //}

            this.http.onreadystatechange = this.handleResponse.bind(this);
            this.http.send(params);

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
                    let event: URLLoaderEvent = new URLLoaderEvent(URLLoader.COMPLETE, this, this.http.responseText, this.http.status, this.http);
                    super.dispatchEvent(event);

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
                    let event: URLLoaderEvent = new URLLoaderEvent(URLLoader.ERROR, this, error, this.http.status, this.http);
                    super.dispatchEvent(event);
                }
            }
        }
    }

}
