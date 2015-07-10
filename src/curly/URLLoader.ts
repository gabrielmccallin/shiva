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

        load(url: string, method:string, params:any, scope:any, headers?:Array<any>, cache?:boolean) {           
            if (this.http) {
                this.http.abort();
            }
            else {
                this.http = new XMLHttpRequest();
            }
            this.http.open(method, url, true);
            this.http.timeout = 20000;
            //this.http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');  

            for (var i in headers) {
                this.http.setRequestHeader(headers[i].value, headers[i].variable);
            }

            //if (!cache) {
            //    this.http.setRequestHeader("If-Modified-Since", "Sat, 01 Jan 2005 00:00:00 GMT");
            //}



            this.http.onreadystatechange = this.handleResponse.bind(this);
            this.http.send(params);

        }

        private setRequestHeader(header:any) {
            this.http.setRequestHeader(header.value, header.variable);
        }

        post(url, params, scope, cache: boolean = false) {
            if (this.http) {
                this.http.abort();
            }
            this.http = new XMLHttpRequest();
            this.http.open("POST", url, true);

            console.log("LOADING", url);
            this.http.timeout = 20000;
            
            // this might freak out some firewalls
            //this.http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            this.http.setRequestHeader("Content-type", "application/json");

            this.http.onreadystatechange = this.handleResponse.bind(this);
            this.http.send(params);
           
        }

        private handleResponse() {
            if (this.http.readyState == 4) {
                if (this.http.status == 200) {
                    var event: Event = new Event(URLLoader.COMPLETE, this, this.http.responseText);
                    super.dispatchEvent(event);

                    this.http.onreadystatechange = null;
                }
                else {
                    var error: string; 
                    if (this.http.status === 0) {
                        error = "Network Error 0x2ee2";
                    }
                    else {
                        error = this.http.status.toString();
                    }
                    var event: Event = new Event(URLLoader.ERROR, this, this.http.status);
                    super.dispatchEvent(event);
                }
            }
        }
    }

}
