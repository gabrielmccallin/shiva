# shiva :trident:
---

A JavaScript library for programming the web.  

No markup, no templates, no CSS. Just code();


## Example usage
---

### Create container

```
import { Container } from "shiva";

let view = new Container({
    text: "I'm a view",
    display: "block",
    backgroundColor: "#333333",
    style: styles.StylishView
});
this.addChild(view);
```

### Update

```
view.innerHtml = "I'm still a view";

// keep your styles in a class
view.style(styles.DifferentStyle);

// or use a literal
view.style({
    backgroundColor: "#dddddd",
    position: "absolute",
    top: "10rem"
});
```

### Extend classes to give them the same abilities
```
import { Container } from "shiva";

class Home extends Container {
    constructor() {
        super({
            id: "Home"
        });
    }
}
```

### Add this class to the DOM
```
let home = new Home();
this.addChild(home);
```

### Maybe some event listeners
```
home.addEventListener(this, "CUSTOM_EVENT", this.homeEventHandler);
```


### Loader wraps XMLHttpRequest, returns a Promise

```
import { Loader } from "shiva";

let loader = new Loader();
loader.load("//api.com/endpointABC", Loader.GET)
.then((reponse)=> {
    // something with the response
    let parsed = JSON.parse(response);
    return parsed.map((item) => {
        return item.title;
    }
})
.then((titles) => {
    // do something else !
    this.listView.update(titles);
});
```

### Use the .to and .fromTo methods of Container for smooth CSS transitions
```
let title = new Container({
    text: "Fade me out"
});

title.to({
    duration: 2,
    delay: 1,
    toVars: {
        opacity: "0"
    }
});
```

### Chain transitions with Promise
```
title.to({
    duration: 2,
    delay: 1,
    toVars: {
        opacity: "0"
    }
})
.then(this.doSomethingElse);   
```


## Getting started
---

### **npm**

```
npm install shiva --save
```

And use something like `browserify` to bundle `shiva` with your app code.


### **Global**
```
<script src="https://cdn.jsdelivr.net/shiva/0.5.7/shiva.min.js"></script>
```
And use the `shiva` global in your code. e.g. `shiva.Container`, `shiva.Button`, `shiva.Loader` etc.


### **Now { code } !**

Extend your entry class with Container and tell it to be the root of the app.  

Add an onload event to `window` and :grinning:   

```
import { Container } from "shiva";

class App extends Container {
    constructor() {
        super({
            root: true
        });
    }
}

window.onload = () => {
    let app = new App();
}; 
```



## Components 
---

#### Build applications quickly with these components, they all extend `Container`

- **Anchor**  

- **Button**  

- **CheckBox**  

- **DropDown**  

- **Image**  

- **RadioButton**

- **StateMachine**  

- **Select**  



## Utilities
---

- **EventDispatcher**  
Custom event dispatching, add / remove.

- **Observer**  
A static version of EventDispatcher.

- **Resize**  
Some simple resize algorithms for fitting and filling.

- **Loader**  
XHR wrapper with event dispatcher and Promise chaining.

- **Window**  
Some Window polyfill methods.



## Container
---

### Methods

- **addToBody()**: void;  
Add container directly to document.body.

- **style( vars: StyleDeclaration )**: void;  
Pass a curly.StyleDeclaration class or literal to set inline CSS styles.
- **className( ...names: string[] )**: void;  

- **addChild( child: curly.Container )**:void  
Append a container to a parent.  

- **removeChild( child: curly.Container )**:void  
Remove a container from a parent.  

- **to( transitionToConfig : { duration: number, delay: number, ease: Ease, toVars: StyleDeclaration })**: Promise<Container>;  
Wraps CSS transitions for smooth animations with chaining.  

- **fromTo( transitionFromToConfig : { duration: number, delay: number, ease: Ease, toVars: StyleDeclaration, fromVars: StyleDeclaration)**: Promise<Container>;    
Wraps CSS transitions for smooth animations with chaining.  

- **addEventListener( scope: any, typeStr: string, listenerFunc: Function, data?: any, useCapture?: boolean )**: void;  
Listen for DOM and custom events.  

- **removeEventListener( typeStr: string, listenerFunc: Function )**: {};  
Remove DOM and custom events.  

- **preventDefault( e: any )**: void;  
Polyfill to prevent default event behavior.  

- **hide()**: void;  

- **show()**: void;  

- **fillContainer()**: void;  

- **centreHorizontal()**: void;  

- **centreHorizontalText()**: void;



### Getters / setters

- **width**: number;
- **height**: number;
- **y**: number;
- **x**: number;
- **alpha**: number;
- **value**: string;
- **id**: string;
- **element**: HTMLElement; (read-only)
- **innerHtml**: string;
- **href**: string;


## Links
---
- Start coding with shiva here: [https://bitbucket.org/gabrielmccallin/shiva-seed](https://bitbucket.org/gabrielmccallin/shiva-seed)
- Example with simple routing:
[https://bitbucket.org/gabrielmccallin/shiva-pages](https://bitbucket.org/gabrielmccallin/shiva-pages)
