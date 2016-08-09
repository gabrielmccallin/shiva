module curly {
    export class ResponsiveText {

        static layout() {
            
            if(curly.Window.width > 1600){
                document.body.style.fontSize = "120%";
            }
            if(curly.Window.width <= 1600 && curly.Window.width > 1000){
                document.body.style.fontSize = "110%";
            }
            if(curly.Window.width <= 1000 && curly.Window.width > 780){
                document.body.style.fontSize = "100%";
            }
            if(curly.Window.width <= 780 && curly.Window.width > 400){
                document.body.style.fontSize = "90%";
            }
            if(curly.Window.width <= 400){
                document.body.style.fontSize = "80%";
            }
        }
    }
}