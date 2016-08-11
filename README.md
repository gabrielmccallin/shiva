# **{ curly }**, a JavaScript library for programming the web. #

## Forget **\< markup >** and use **{ code }** instead. 
## **{ curly }** removes the need for binding markup to JavaScript and brings complete programmatic control over styling and behavior. 

#
## Example usage

**Create container**

```
let view = new curly.Container({
    text: "I'm a view",
    display: "block",
    backgroundColor: "#333333",
    style: styles.StylishView
});
this.addChild(view);
```
**Then update it when you need**
```
view.innerHtml = "I'm still a view";
view.style({
    backgroundColor: "#dddddd",
    position: "absolute",
    top: "10rem"
});
```
**Extend classes to give them the same abilities**
```
export class HomeView extends curly.Container {
    constructor() {
        super({
            id: "Home"
        });
    }
}
```
**Add this class to the DOM**
```
let home = new HomeView();
this.addChild(home);
```
**Maybe some event listeners**
```
home.addEventListener(this, "CUSTOM_EVENT", this.homeEventHandler);
```
#
## Components 

### Build applications quickly with these components

- **Anchor**  

- **Button**  

- **CheckBox**  

- **DropDown**  

- **Image**  

- **RadioButton**

- **StateMachine**  

- **Select**  

#
## Utilities

- **EventDispatcher**
    - Custom event dispatching, add / remove

- **Observer**
    - A static version of EventDispatcher

- **Resize**
    - Some simple resize algorithms for fitting and filling

- **URLLoader**
    - XHR wrapper with event dispatcher

- **Window**  
    - Some Window polyfill methods


#
## curly.Container methods ###
- **addToBody()**: void; 
    - add container directly to document.body    
- **style( vars: StyleDeclaration )**: void;
    - pass a curly.StyleDeclaration class or literal to set inline CSS styles  
- **className( ...names: string[] )**: void;
- **addChild( child: curly.Container )**:void
    - append a container to a parent 
- **removeChild( child: curly.Container )**:void
    - remove a container from a parent
- **to( duration: number, vars: Object )**: TweenMax;
    - wraps TweenMax to provide easy animation methods  
- **fromTo( duration: number, fromVars: Object, toVars: Object )**: TweenMax;
    - wraps TweenMax to provide easy animation methods  
- **from(duration: number, vars: Object)**: TweenMax;
- **addEventListener( scope: any, typeStr: string, listenerFunc: Function, data?: any, useCapture?: boolean )**: void;
    -  listen for DOM and custom events
- **removeEventListener( typeStr: string, listenerFunc: Function )**: {};
    -  remove DOM and custom events  
- **preventDefault( e: any )**: void;
    - polyfill prevent default event behavior  
- **hide()**: void;
- **show()**: void;
- **fillContainer()**: void;
- **centreHorizontal()**: void;
- **centreHorizontalText()**: void;



### Getters / setters:  ###

- width: number;
- height: number;
- y: number;
- x: number;
- alpha: number;
- value: string;
- id: string;
- element: HTMLElement;
- innerHtml: string;
- href: string;

#
## Links
See [https://bitbucket.org/gmccallin/curly-culture](https://bitbucket.org/gmccallin/curly-culture) for a starter template or [https://bitbucket.org/gmccallin/curly-demo-app](https://bitbucket.org/gmccallin/curly-demo-app) for a more complex example application.