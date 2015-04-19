module curly {
    export class Image extends curly.Container {

        constructor(id?:string) {
            if (id) {
                super(id, "img");
            }
            else {
                super("Image", "img");
            }
            this.set({
                width: "auto",
                height: "auto"
            });

            this.addDomEventListener(this, "load", this.loaded);
            this.addDomEventListener(this, "error", this.error);
        }

        private loaded(e: Event) {
            console.log("picture loaded: ", e);
        }

        private error(e: Event) {
            console.log("error");
        }

        load(path:string) {
            this.element.setAttribute("src", path);
        }

        

    }
}