# `shiva`

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/gabrielmccallin/shiva/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/shiva.svg?style=flat)](https://www.npmjs.com/package/shiva "View this project on npm") [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/gabrielmccallin/shiva)
![javascript](https://img.shields.io/badge/-javascript-informational.svg) ![front-end](https://img.shields.io/badge/-frontend-informational.svg) ![declarative](https://img.shields.io/badge/-declarative-informational.svg) ![ui](https://img.shields.io/badge/-ui-informational.svg) ![library](https://img.shields.io/badge/-library-informational.svg)

**`shiva`** is a minimal JavaScript library (2.5KB gzipped) for building reactive user interfaces - no template language, no virtual DOM. It is built on a simple premise: the DOM API is already a capable interface, what would a thin wrapper with a more ergonomic syntax look like?

So instead of:

```html
<div>Hi there 👋</div>
```

**`shiva`** provides a function called `div()`:

```javascript
import { div } from "shiva"

const element = div("Hi there 👋")
```

## Nested

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

## Mixed content

Strings and elements can be mixed freely as arguments. Order is preserved:

```javascript
import { p, strong } from "shiva"

const sentence = p("The value is ", strong("42"), " and that's final.")
```

This produces:

```html
<p>The value is <strong>42</strong> and that's final.</p>
```

## Attributes

To pass attributes to an element:

```javascript
import { div } from "shiva"

const handler = () => {
    console.log("handled it 👊")
}

const superDiv = div("Hi there 👋", { 
    onclick: handler,
    className: "mr-2",
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

To create other HTML elements not included in the API, **`shiva`** provides a more generic `element()` function.

```javascript
import { element } from "shiva"

const section = element("section", "I am a section")
```

Any HTML element, including custom elements, can be created.

## Components

Any function that returns a HTML element is a component:

```javascript
import { div, h2, p } from "shiva"

const card = (title, body) => div(h2(title), p(body))

const page = div(
    card("Hello", "First card"),
    card("World", "Second card"),
)
```

Components are plain functions — no lifecycle, no decorators, no special syntax. Each component just needs to return an `HTMLElement` (or array of elements) to be composed into a parent.

## Installation

```javascript
npm install shiva
```

**`shiva`** is distributed as an ES module. Please use a module aware build tool to import.

See `./consumer` for an example of how to include **`shiva`** in a project.

## Getting started

### Create root element

To append a root element to `document.body`, pass `{ root: true }` as an option:

```javascript
import { div } from "shiva"

const app = () => {
    div({ root: true },
        componentA(),
        componentB()
    )
}

app()
```

This appends a `<div>` to the page body with `componentA` and `componentB` nested inside.  

👉 `componentA` and `componentB` **_must_** return a HTML element or array of HTML elements to be appended to the parent.

## Reactive state with signals

**`shiva`** provides a `signal` factory for reactive state. A signal holds a value and notifies subscribers automatically when it changes.

```javascript
import { signal, p, code } from "shiva"

const count = signal(0)

const counter = p(code(count))
// counter.textContent updates automatically when count changes

count.set(1) // counter now shows "1"
```

`subscribe` returns an unsubscribe function to stop listening:

```javascript
const unsubscribe = count.subscribe(() => {
    console.log(count.get())
})

unsubscribe() // stops the listener
```

### Object signals with reactive fields

When `signal` is given an object, every field becomes its own reactive signal. Pass field signals directly to elements - they update independently when only their value changes.

```javascript
import { signal, h2, p } from "shiva"

const data = signal({ heading: "Hello", body: "World" })

const { heading, body } = data

const view = p(h2(heading), body)

data.set({ heading: "Updated", body: "World" })
// only the h2 updates - body is unchanged and does not re-render
```

Field signals can also be set individually, writing back to the parent signal:

```javascript
heading.set("Just the heading")
// data.get().heading === "Just the heading"
// body is unaffected
```

### Deeply nested reactive fields

Object signals are recursive. Nested objects also become reactive - field access chains as deep as the data structure:

```javascript
import { signal, p } from "shiva"

const data = signal({
    meta: {
        title: "shiva",
        description: "A minimal UI library"
    }
})

const { meta } = data
const { title, description } = meta

const view = p(title, " - ", description)

data.set({
    meta: {
        title: "shiva",
        description: "No virtual DOM"
    }
})
// only description updates - title did not change
```

Writing back through a nested field signal propagates to the root:

```javascript
description.set("Updated")
// data.get().meta.description === "Updated"
```

### Reactive style

A signal can be passed as a `style` value to reactively update an element's styles.

```javascript
import { signal, div } from "shiva"

const style = signal({ color: "crimson", fontSize: "2rem" })

const el = div("hello", { style })

style.set({ color: "royalblue", fontSize: "2rem" }) // el style updates in place
```

Individual style properties can also be signals:

```javascript
const color = signal("crimson")

const el = div("hello", { style: { color } })

color.set("royalblue") // only color updates
```

### Reactive attributes

The same patterns apply to `attributes`:

```javascript
import { signal, div } from "shiva"

const attributes = signal({ "data-count": "0", id: "counter" })

const el = div("hello", { attributes })

attributes.set({ "data-count": "1", id: "counter" }) // attributes update in place
```

Individual attribute values can also be signals:

```javascript
const dataCount = signal("0")

const el = div("hello", { attributes: { "data-count": dataCount } })

dataCount.set("1") // only data-count updates
```

### Signal API

```typescript
// Primitive signal
const s = signal(0)

s.get(): T
s.set(value: T): void
s.subscribe(fn: () => void): () => void  // returns unsubscribe

// Object signal - every field is also a signal
const s = signal({ name: "Alice", age: 30 }): ReactiveSignal<{ name: string, age: number }>

s.name.get()           // "Alice"
s.name.set("Bob")      // updates name, notifies name subscribers
s.name.subscribe(fn)   // subscribe to name changes only
s.get()                // { name: "Alice", age: 30 }
s.set({ name: "Bob", age: 30 }) // replace whole object
```

> **Note:** The field names `get`, `set`, and `subscribe` are reserved and cannot be used as keys in objects passed to `signal()`.

#### `isSignal`

A type guard for duck-typed signal detection:

```javascript
import { signal, isSignal } from "shiva"

isSignal(signal(0))  // true
isSignal({ get: () => 0, set: () => {}, subscribe: () => () => {} })  // true
isSignal("hello")    // false
```

---

## State (pubsub)

**`shiva`** also provides a simple publish / subscribe utility.

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
pubsub<T>(
    initial?: T,
    reducer?: (current: T, next: T) => T
): [(callback: (state: T) => void) => void, (payload: T) => T]
```

Initialise state with `initial`.

Run a function on new state with a `reducer` function. Can be used for more complex logic or when the next state depends on the previous one.

```javascript
const reducer = (state, newState) => state + newState

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
```

Here we can name the subscribe / publish functions, note we don't call the globalStore, it is already a subscribe / publish tuple.

## TypeScript

**`shiva`** ships with type definitions. Types are available for import:

```typescript
import { signal } from "shiva"
import type { Signal, ReactiveSignal, ReactiveStyle, ContainerOptions } from "shiva"

const count: Signal<number> = signal(0)

const style = signal<ReactiveStyle>({ color: "blue" })

type User = { name: string; age: number }
const user: ReactiveSignal<User> = signal({ name: "Alice", age: 30 })
// user.name is Signal<string>, user.age is Signal<number>
```

## Tree shaking

**`shiva`** is marked as side-effect free. Bundlers like webpack, rollup, and vite will tree-shake unused exports.

## License

[MIT license](./LICENSE)
