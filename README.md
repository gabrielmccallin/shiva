# shiva :trident:

A JavaScript library for programming the web.  

No markup, no templates, no CSS. Just code();

[https://gabrielmccallin.bitbucket.io/shiva/](https://gabrielmccallin.bitbucket.io/shiva/)

---
### **Getting started**
#### npm

```
npm install shiva --save
```

And use something like `browserify` to bundle `shiva` with your app code.    

If your IDE supports declaration files, `shiva.d.ts` is in the `/dist` folder. This should provide code completion for the library.


#### Global
```
<script src="https://cdn.jsdelivr.net/shiva/latest/shiva.min.js"></script>
```
And use the `shiva` global in your code. e.g. `shiva.Container`, `shiva.Button`, `shiva.Loader` etc.

If your IDE supports declaration files, download [https://cdn.jsdelivr.net/shiva/latest/shiva-global.d.ts](https://cdn.jsdelivr.net/shiva/latest/shiva-global.d.ts) and place in your project. This should provide code completion for the library.

---
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
    new App();
}; 
```

#### Create container

```
import { Container } from "shiva";

const view = new Container({
    text: "I'm a view",
    style: {
        display: "block",
        backgroundColor: "#333333",
    }
});
this.addChild(view);
```

#### Update

```
view.innerHtml = "I'm still a view";

// keep your styles in a class
view.style(styles.DifferentStyle);

// or use an object literal
view.style({
    backgroundColor: "#dddddd",
    position: "absolute",
    top: "10rem"
});
```

#### Extend your own classes to give them the same abilities
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

#### Add this class to the DOM
```
const home = new Home();
this.addChild(home);
```

#### Event listeners
`Container` extends an event dispatcher class so you can listen / dispatch events on your classes.
```
// outside home class
home.addEventListener(this, "CUSTOM_EVENT", this.homeEventHandler);

// inside home class 
this.dispatchEvent(new Event("CUSTOM_EVENT", this));

// this.homeEventHandler will fire outside of home 
```

#### Animations!  
Use the .to and .fromTo methods of Container for smooth CSS transitions
```
const title = new Container({
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

#### Chain transitions
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

#### Loader wraps XMLHttpRequest, returns a Promise

```
import { Loader } from "shiva";

Loader.get({
    url: "//api.com/endpointABC",
    params: {
        page: 2,
        limit: 20
    }
})
.then(response => {
    // something with the response
    let parsed = JSON.parse(response);
    return parsed.map(item => {
        return item.title;
    }
})
.catch(error => console.error(error))
.then(titles => {
    // do something else !
    this.listView.update(titles);
});
```



---
### **Components** 

Build applications quickly with these components, they all extend `Container`

- **Anchor**  

- **Button**  

- **CheckBox**  

- **DropDown**  

- **Image**  

- **RadioButton**

- **StateMachine**  

- **Select**  


---
### **Utilities**

- **EventDispatcher**  
Custom event dispatching, add / remove. `Container` extends this so you can listen / dispatch on your classes, see above for example.

- **Loader**  
XHR wrapper with event dispatcher and Promise chaining. See above for example.

- **ObjectUtils**  
Object utility helpers. Only contains a static `merge` method which merges two objects, source overwrites target.
```
ObjectUtils.merge(targetObject, sourceObject);
```

- **Observer**  
A static version of EventDispatcher for listening and dispatching events globally.
```
// In a class where you want to listen for a global event
Observer.addEventListener(this, "CUSTOM_EVENT", this.handler);

// In the class where you want to dispatch a global event
Observer.dispatchEvent(new Event("CUSTOM_EVENT", this));
```

- **Resize**  
Some simple resize algorithms for fitting and filling.

- **Window**  
Some Window polyfill methods.


---
### **Container API**

Methods
- **constructor( config: ContainerConfig )**: void;
```
interface ContainerConfig {
    // to denote a root level container
    root?: boolean;
    
    // sets the HTMLElement id attribute
    id?: string; 
    
    // sets the HTMLElement type attribute, defaults to div
    type?: string;

    // sets the HTMLElement style attribute from a StyleDecaration object
    style?: StyleDeclaration; 

    // sets the HTMLElement style attribute from an array of StyleDeclaration objects
    styles?: StyleDeclaration[];

    // alias for innerHtml
    text?: string;

    // attaches custom data to the container
    data?: any;

    // sets HTMLElement class attribute
    className?: string | string[];
}    
```
    
- **addToBody()**: void;  
Add container directly to document.body.

- **style( vars: StyleDeclaration )**: void;  
Pass a StyleDeclaration class or object literal to set inline CSS styles.

- **styles( vars: StyleDeclaration[] )**: void;  
Pass an array of StyleDeclaration classes or object literals to set inline CSS styles.

- **className( ...names: string[] )**: void;  
Names of CSS classes to add to the container using spread.
```
container.className("navigation__container", "navigation__container--first", "top-navigation");
```

- **addChild( child: Container )**:void  
Append a container to a parent.  

- **removeChild( child: Container )**:void  
Remove a container from a parent.  

- **to( transitionToConfig : { duration: number, delay: number, ease: Ease, toVars: StyleDeclaration })**: Promise<Container  
Wraps CSS transitions for smooth animations with chaining.  

- **fromTo( transitionFromToConfig : { duration: number, delay: number, ease: Ease, toVars: StyleDeclaration, fromVars: StyleDeclaration)**: Promise<Container    
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



Getters / setters

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


---
### **Links**
- Extremely simple example with shiva:trident: as a global library:  
[https://bitbucket.org/gabrielmccallin/shiva-global](https://bitbucket.org/gabrielmccallin/shiva-global)

- Start coding with shiva:trident: and Typescript:  
[https://bitbucket.org/gabrielmccallin/shiva-seed](https://bitbucket.org/gabrielmccallin/shiva-seed)

- Example with simple routing:  
[https://bitbucket.org/gabrielmccallin/shiva-pages](https://bitbucket.org/gabrielmccallin/shiva-pages)
