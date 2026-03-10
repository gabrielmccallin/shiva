# Change Log

## `[5.0.6]`

🔖 v5.0.6

- ⬆️ Updates minimatch from 3.1.2 to 3.1.5
- 😵 Removes @tootallnate/once
- ⬆️ Updates jest-environment-jsdom from 29.7.0 to 30.2.0
- ⬆️ Bump js-yaml from 3.14.1 to 3.14.2

## `[5.0.5]`

- ⬆️ update for [CVE-2025-7783](https://github.com/advisories/GHSA-fjxv-7rqg-78g4)
 `form-data` uses unsafe random function in choosing boundary < 4.0.4

## `[5.0.4]`

- ⬆️ update CHANGELOG

## `[5.0.3]`

🔖 v5.0.3 ⬆️ ts config updates

## `[5.0.2]`

🔖 v5.0.2 ⬆️ ts config updates

## `[5.0.1]`

🔖 v5.0.1 ⬆️ publish to npm

## `[5.0.0]`

💔

- element function instead of tag
- updated README
- example site

## `[4.1.8]`

- ⬆️ update for [CVE-2023-45133](https://github.com/advisories/GHSA-67hx-6x53-jw92)
 `@babel/traverse` < 7.23.2

## `[4.1.7]`

- ⬆️ update dependencies

## `[4.1.6]`

- ⬆️ update for `CVE-2022-46175`  
  `json5` 2.0.0 - 2.2.1
  
  Prototype Pollution in JSON5 via Parse Method - <https://github.com/advisories/GHSA-9c47-m6qq-7p4h>
- ⬆️ update for `CVE-2022-3517`  
  `minimatch`  <3.0.5
  
  minimatch ReDoS vulnerability - <https://github.com/advisories/GHSA-f8q6-p94x-37v3>
- ➕ added `jest-environment-jsdom` package

## `[4.1.5]`

- ⬆️ update for `CVE-2021-44906`  
  Prototype Pollution in minimist

## `[4.1.4]`

- ⬆️ update `CVE-2021-23440: set-value`
- ⚙️ Jest jsdom environment

## `[4.1.3]`

- 📝 Readme update

## `[4.1.2]`

- ⬆️ update for `path-parse` CVE

## `[4.1.1]`

- ⬆️ update vulnerabilities in devDependencies

## `[4.1.0]`

- ➕ added better generic typing for utilities built on`tag`

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

## `[3.2.2]`

- 🐛 state reducer running twice in `useState()`

## `[3.2.1]`

- 🐛 added lodash dependency

## `[3.2.0]`

- 🦅 Nested state object

## `[3.1.2]`

- ⬆ Update dependencies

## `[3.1.1]`

- 🏠 Update shiva homepage URL

## `[3.1.0]`

- ✨ Access state value
- 🐛 text nodes as children now handled properly with setState

## `[3.0.3]`

- 📝 Package description

## `[3.0.2]`

- 📝 README npm badge

## `[3.0.1]`

- 🚀 Bump for npm publish

## `[3.0.0]`

- 🎉
- ✨ Declarative component behaviour with a standard JavaScript syntax
- ✨ Unidirectional data binding to component display
