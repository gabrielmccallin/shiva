# **{curly}**, a JavaScript library for programming the web. #

Forget <markup> and use {code} instead. Program instead of jumping between script, CSS and HTML markup.

### Extend your classes with curly.Container to obtain the following DOM methods:  ###

- **addToBody**, use this in your entry point to attach all your classes to the DOM  

- **set(vars:Object)**, pass an object to set any CSS value  

- **addChild(child:HTMLElement)**, append a container  

- **removeChild(child:HTMLElement)**, remove a container  

- **to(duration: number, vars: Object)**, wraps TweenMax to provide easy animation methods  

- **fromTo(duration: number, vars: Object)**, wraps TweenMax to provide easy animation methods  

- **addDomEventListener(scope: any, typeStr: string, listenerFunc: Function)**, listen for DOM events  

- **removeDomEventListener(typeStr: string, listenerFunc: Function)**, remove DOM event listeners   

- **addEventListener(scope: any, typeStr: string, listenerFunc: Function)**, listen for custom events  

- **removeEventListener(typeStr: string, listenerFunc: Function)**, remove custom event listeners  

- **preventDefault(e:Event)**, polyfill prevent default event behavior  



### Getters / setters:  ###

- **width**  

- **height**  

- **y**  

- **x**  


### Build your applications quickly with the following components:  ###

- **Button**  

- **LabelButton**  

- **Image**  

- **Observer**  

- **Rectangle**  

- **TextField**  

- **URLLoader**  


### And these helpers:  ###

- **Resize**, some simple resize algorithms  

- **Window**, some Window polyfill methods