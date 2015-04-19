/// <reference path="container.ts" />

module curly {
    export class Rectangle extends Container {
        constructor(width: any,
            height: number,
            colour: any,
            id?: string)
        {
            if (id) {
                super(id);
            }
            else {
                super("Rectangle");
            }

            this.set({
                width: width,
                height: height,
                backgroundColor: colour,
                top: 0,
                left: 0,
                overflow: "hidden"
            });


        }


        addBorder(thickness: number = 1, style: string = "solid", colour: string = "#000000")
        {
            this.set({
                border: thickness + "px",
                borderStyle: style,
                borderColor: String(colour)
            });
        }


    }
}

    



