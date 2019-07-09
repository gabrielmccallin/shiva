# [**shiva** 🔱](https://gabrielmccallin.bitbucket.io/shiva/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://bitbucket.org/gabrielmccallin/shiva/blob/master/LICENSE) [![npm version](https://img.shields.io/badge/npm-v3.0.0-blue.svg?style=flat)](https://www.npmjs.com/package/shiva) [![Bitbucket Pipeline Status](https://img.shields.io/badge/pipeline-passing-green.svg)](https://bitbucket.org/gabrielmccallin/shiva/addon/pipelines/home#!/results/branch/master/page/1) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://bitbucket.org/gabrielmccallin/shiva)  
![javascript](https://img.shields.io/badge/-javascript-informational.svg) ![frontend](https://img.shields.io/badge/-frontend-informational.svg) ![declarative](https://img.shields.io/badge/-declarative-informational.svg) ![ui](https://img.shields.io/badge/-ui-informational.svg) ![library](https://img.shields.io/badge/-library-informational.svg)

**`shiva`** is a minimal JavaScript library for building user interfaces.

**Declarative**  
Describe component behaviour with a standard JavaScript syntax and **`shiva`** will efficiently update views when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.

**Modular**  
Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass data through your app and keep state out of the DOM.

**State management**  
Render views with a simple one-way data binding syntax.

## **Installation**
```
npm install shiva --save
```

`shiva` is distributed as an ES module. Use a module aware build tool to `import` functions.
See [example](https://example) for an example of how to include `shiva` in a project.

## **Getting started**

#### Create root container
The `container()` function creates HTML elements and declares attributes, children, events, styles and many other properties.

```javascript
import { container } from 'shiva';

const app = () => {
    container({
        root: true,
        textContent: 'Hi there 🙋‍'
    });
};

app();
```

This will append a HTMLElement `<div>` to the body of the page with text content of 'Hi there 🙋‍'.

#### Create container

```javascript
import { container } from 'shiva';

const view = container({
    textContent: `I'm a view`
});
```

#### Add child containers

```javascript
const view = container({
    textContent: `I'm a view`,
    children: [
        container({
            textContent: 'child 1 🙍‍'
        }),
        container({
            textContent: 'child 2 🙍‍'
        }),
    ]
});
```

#### Declare containers anywhere and add them to the view

```javascript
const childFactory = () => {
    return container({
        textContent: 'child 1 🙍‍'
    });
};

const view = container({
    textContent: `I'm a view`,
    children: childFactory()
});

```

#### Event listeners

```javascript
const clickHandler = e => {
    // do something
};

const clickMe = container({
    textContent: 'Click me!',
    events: [{
        name: 'click',
        handler: clickHandler
    }]
});
```

#### Configuration

`container()` takes a configuration object described by this interface:

```typescript
interface ContainerConfig {
    attributes?: [key: string]: string | boolean | number | State;
    children?: HTMLElement[] | HTMLElement | State;
    events?: EventSchema[] | EventSchema;
    root?: boolean;
    style?: Partial<CSSStyleDeclaration> | State;
    tagName?: HTMLTagName;
}
```

* **attributes**
An object to populate HTML attributes, keys are string, values are primitives or a State object.

* **children**
A HTMLElement, array of HTMLElements to append to the container or State object.

* **events**
An object or array of objects that describe a event type and handler to add to the container.

* **root**
Appends the container to the body of the page. Use at the entrypoint of the application to attach all children to.

* **style**
Style the element with inline css declarations, this can also be a State object.

* **tagName**
Type of container, e.g. paragraph, input, anchor, select etc

#### **Example**

```javascript
const app = container({
    textContent: 'Hello there 💋',
    tagName: 'p',
    id: 'viewA',
    attributes: {
        data-shiva: '🔱',
        ...otherAttributes
    },
    style: {
        color: 'blue',
        ...otherCSSStyles
    },
    children: [
        container({
            textContent: 'child 1'
        }),
        container({
            textContent: 'child 2'
        })
    ],
    events: [{
        name: 'custom',
        handler: customHandler
    }],
    root: true;
});
```

## **State**

Declare one-way data binding to keep views up to date with data changes.

#### Setting state
Inspired by React hooks, `useState()` will return a tuple; the first item is a state variable, the second item a function to update the variable.

```javascript
const [temperature, setTemperature] = useState('21');

const view = container({
    textContent: `${temperature}°C`,
});
// component shows 21°C

setTemperature('31');
// component shows 31°C ☀️
```

#### Setting state with a reducer function
Second parameter of `useState()` is a reducer function that will run every time the update function is called.

```javascript
const addDegrees = temperature => `${temperature}°C`;

const [temperature, setTemperature] = useState('21', addDegrees);

const view = container({
    textContent: temperature,
});
// component shows 21°C

setTemperature('31');
// component shows 31°C ☀️
```

## License

[MIT license](./LICENSE).
