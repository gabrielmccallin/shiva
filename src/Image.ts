module curly {
    export class Image extends Container {

        static COMPLETE: string = "load";
        static ERROR: string = "error";

        constructor(config: ImageConfig) {
            let containerConfig;
            if (config.style) {
                containerConfig = <ContainerConfig>config.style;
            }
            else {
                containerConfig = {};
            }

            containerConfig.type = "img";
            super(containerConfig);

            this.load(config.path);

            // this.addEventListener(this, Image.COMPLETE, this.loaded);
            // this.addEventListener(this, Image.ERROR, this.error);
        }

        load(path: string) {
            this.element.setAttribute("src", path);
        }

        // private loaded(e: Event) {
        //     super.dispatchEvent(new Event(Image.COMPLETE, this, e.data, e));
        //     console.log("picture loaded: ", e);
        // }

        // private error(e: Event) {
        //     console.log("error");
        // }
    }
}