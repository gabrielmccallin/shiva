# `shiva`

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://bitbucket.org/gabrielmccallin/shiva/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/shiva.svg?style=flat)](https://www.npmjs.com/package/shiva "View this project on npm") [![Bitbucket Pipeline Status](https://img.shields.io/badge/pipeline-passing-green.svg)](https://bitbucket.org/gabrielmccallin/shiva/addon/pipelines/home#!/results/branch/master/page/1) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://bitbucket.org/gabrielmccallin/shiva)
![javascript](https://img.shields.io/badge/-javascript-informational.svg) ![front-end](https://img.shields.io/badge/-frontend-informational.svg) ![declarative](https://img.shields.io/badge/-declarative-informational.svg) ![ui](https://img.shields.io/badge/-ui-informational.svg) ![library](https://img.shields.io/badge/-library-informational.svg)

**`shiva`** is a minimal JavaScript library for building user interfaces.

## Aim

The aim of **`shiva`** is to use JavaScript to create HTML elements with a more declarative DSL (yes I know, another DSL 😁).

- No need for a HTML templating language like `jsx`
- Have access to the HTML element for further manipulation after creation

So instead of:

```html
<div>Hi there 👋</div>
```

**`shiva`** provides a function called `div()`:

```javascript
import { div } from "shiva"

const HTMLDivElement = div("Hi there 👋")
```

## Nested

Nested elements are easy to construct:

```javascript
import { div } from "shiva"

const nestedHTMLDivElement = div(
    div("Hi there 👋"),
    div("Hi there 👋"),
)
```

This will produce:

```html
<div>
    <div>Hi there 👋</div>
    <div>Hi there 👋</div>
</div>
```

**`shiva`** will append HTML elements if they are passed as an argument. It will create and append a `textNode` element if a string is passed.

## Attributes

To pass attributes to an element:

```javascript
import { div } from "shiva"

const handler = () => {
    console.log("handled it 👊")
}

const superDiv = div("Hi there 👋", { 
    onclick: handler,
    class: style,
    id: "Super Div 🦸‍♂️",
    style: {
        fontSize: "3rem"
    }
})
```

**`shiva`** will apply attributes if an object is passed as one of the arguments.

## Elements

**`shiva`** provides:

- `div()`
- `img()`
- `p()`
- `h1()`
- `h2()`
- `h3()`
- `h4()`
- `h5()`
- `h6()`
- `b()`
- `strong()`
- `i()`
- `em()`
- `a()`
- `ul()`
- `ol()`
- `li()`
- `span()`
- `br()`
- `code()`
- `pre()`
- `button()`

To create other HTML elements not included in the API,  **`shiva`** provides a more generic `element()` function.

```javascript
import { element } from "shiva"

const HTMLButtonElement = element("button", "Click me ⬇️")
```

Any HTML element, including custom elements, can be created.

## Components

Element functions like `div()` or `element()` take a HTML element as an argument.

```javascript
import { div } from "shiva"

const component = (title) => {
    return div(title) 
    // returns a HTMLDivElement
}

const divAndComponent = div(
    component("The TITLE")
)
```

This pattern can be used to build an application out of pieces, each component just needs to return a HTML element (or array of HTML elements).

Of course, `component()` can be imported from another file.

## Installation

```javascript
npm install shiva --save
```

**`shiva`** is distributed as an ES module. Please use a module aware build tool to import.

See `./consumer` for an example of how to include **`shiva`** in a project.

## Getting started

### Create root element

To append a root element that all other elements will attach to:

```javascript
import { div } from 'shiva'

const app = () => {
    div({ root: true }, 
        componentA(),
        componentB()
    )
}

app()
```

This will append a HTMLElement `<div>` to the body of the page with `componentA` and `componentB` nested inside.  

👉 `componentA` and `componentB` **_must_** return a HTML element or array of HTML elements to be appended to the parent.

## State

**`shiva`** provides a very simple publish / subscribe utility.

`pubsub()` returns an array where the first element is the **subscribe** function and the second element is the **publish** function.

```javascript
import { pubsub } from "shiva"

const [subscribe, publish] = pubsub([1, 2, 4, 5])

subscribe(data => {
    console.log(data)
    // logs the value passed to publish()
})

// some time later
publish([6,7,9,12]) // logs [6,7,9,12]
```

### API

```typescript
pubsub(
    initial?: any,
    reducer?: (current: any, next: any) => void
)
```

Initialise state with `initial`.

Run a function on new state with a `reducer` function. Can be used for more complex logic or when the next state depends on the previous one.

```javascript
const reducer = (state, newState) => return state + newState

const [subscribe, publish] = pubsub("DOGE", reducer)

subscribe(state => {
    console.log(state)
})

publish(" to the moon 🚀") // logs "DOGE to the moon 🚀" 
```

## Global store

Extending the publish / subscribe pattern across components creates a global store, useful if you don't want to pass subscribers and publishers through nested components.

**`shiva`** provides a `createStore()` function to create this global store.

```javascript
// global-store.js
import { createStore } from "shiva"

const globalStore = createStore("🌍")

export default globalStore
```

Now subscribe or publish to this store.

```javascript
// another file
import globalStore from "./global-store"

const [subscriberGlobal, publishGlobal] = globalStore

// Here we can name the subscribe / publish functions, note we don't call the globalStore, it is already a subscribe / publish tuple.
```

## License

[MIT license](./LICENSE)
