# Change Log

## `[4.0.0]`
- 🎉 This major release focuses on a simple JavaScript API for creating and nesting HTML elements. 
- 🛠 `tag()` takes children, textContent and options in any order in an argument list. Partial application of `tagName` with `tag()` gives us `div()`, `p()` and `img()`. This can be extended to create a function for any HTML element.
- ➕ added `pubsub()` for local state management
- ➕ added `createStore()` for global state management
- ➖ removed data binding with elements for a simpler library

## `[3.4.0]`
- ✨ added `customElement` field to `ContainerSchema` for creating custom elements

## `[3.3.0]`
- ✨ `value()` to get the value of a state object
- 🏷 added types for things returned by `useState`

## `[3.2.3]`
- 🛠 refactor of internal state data structure
- ⬇️ remove lodash.merge

---
## `[3.2.2]`
- 🐛 state reducer running twice in `useState()`

---
## `[3.2.1]`
- 🐛 added lodash dependency

---
## `[3.2.0]`
- 🦅 Nested state object

---
## `[3.1.2]`
- ⬆ Update dependencies

---
## `[3.1.1]`
- 🏠 Update shiva homepage URL

---
## `[3.1.0]`
- ✨ Access state value
- 🐛 text nodes as children now handled properly with setState

---
## `[3.0.3]`
- 📝 Package description

---
## `[3.0.2]`
- 📝 README npm badge

---
## `[3.0.1]`
- 🚀 Bump for npm publish

---
## `[3.0.0]`
- 🎉
- ✨ Declarative component behaviour with a standard JavaScript syntax
- ✨ Unidirectional data binding to component display
