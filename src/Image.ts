module curly {
    export class Image extends Container {

        constructor(config:ImageConfig) {
            config.type = "img";
            super(config);
            
            this.load(config.path);

            // this.addEventListener(this, "load", this.loaded);
            // this.addEventListener(this, "error", this.error);
        }

        load(path: string) {
            this.element.setAttribute("src", path);
        }

        // private loaded(e: Event) {
        //     console.log("picture loaded: ", e);
        // }

        // private error(e: Event) {
        //     console.log("error");
        // }
    }
}