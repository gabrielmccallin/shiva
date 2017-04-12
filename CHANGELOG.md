# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

---
## `[2.0.0]` 2017-04-12
### Added
- ContainerConfig `styles` property for passing multiple styles (:warning: BREAKING CHANGE)
- ContainerConfig `classNames` property 
- CHANGELOG.md
- hover style property for hoverable components
- ObjectUtils helper class (didn't want a lodash dep!)
- HoverStyle interface
- Starting to add documentation comments
- npm publish with bitbucket pipeline :green_heart:
### Changed
- ButtonConfig takes `text` property instead of `label` (:warning: BREAKING CHANGE)
- :hammer: Dropdown component, much easier to style (:warning: BREAKING CHANGE)
- README.md updates with new Container signature
- Container classNames method works with multiple classes
- Some refactoring of style interfaces
- Some union type experimentation
- :art: grouped all classes into new folder structure
- :hammer: Button component, more resilient to style abuse
- :lipstick: tidied default styles 
- Button component can now store custom data, constructor tidy up
- removed some references to the curly library :blush:
- width property of StyleDeclaration is a string | Number
- :hammer: Pages component now does routing, history management and address bar updates, can toggle with `routes` property
- removed some console.logs :blush:
- Promise decalaration file explictly included in gulp build instead of ///ref
- Loader component now with static methods and returns the response of the network request instead of an event
- Loader component uses modern XMLHttpRequest API

---
## `[1.0.0]` 2017-03-14
### Added
- Container get / set data
- Loader.httpMethods.GET / POST / PUT / UPDATE static constants
- Loader.load now with custom data in response event
- LoaderConfig interface
- Experimenting with union type for LoaderHttpMethods
- Styles.caret styles for dropdown component
- Styles.listItem styles for dropdown component
- ButtonConfig.label
### Changed
- ContainerConfig.style can take an StyleDeclaration [] | StyleDeclaration (:warning: BREAKING CHANGE)
- ContainerConfig no longer extends StyleDeclaration (:warning: BREAKING CHANGE)
- Loader.load takes a LoaderConfig object (:warning: BREAKING CHANGE)
- dropdown component styling improvements
- default label for a button component; "Button"

---
## `[0.6.2]` - 2017-03-03
### Added
### Changed
- Some default style changes
- Dropdown component animation on expand / contract

---
## `[0.6.1]` - 2017-03-03
### Added
### Changed
- README

---
## `[0.6.0]` - 2017-03-02
### Added
### Changed
- Button checks for empty config object
- Button icon improvements
- Dropdown config object takes item styles

---
## Diffs
`[Unreleased]` [https://bitbucket.org/gabrielmccallin/shiva/branches/compare/master%0Dv1.0.0](https://bitbucket.org/gabrielmccallin/shiva/branches/compare/master%0Dv1.0.0)  

`[1.0.0]` [https://bitbucket.org/gabrielmccallin/shiva/branches/compare/v1.0.0%0Dv0.6.2#diff](https://bitbucket.org/gabrielmccallin/shiva/branches/compare/v1.0.0%0Dv0.6.2#diff)  

`[0.6.2]` [https://bitbucket.org/gabrielmccallin/shiva/branches/compare/v0.6.2%0Dv0.6.1#diff](https://bitbucket.org/gabrielmccallin/shiva/branches/compare/v0.6.2%0Dv0.6.1#diff)  


`[0.6.1]` [https://bitbucket.org/gabrielmccallin/shiva/branches/compare/v0.6.1%0Dv0.6.0#diff](https://bitbucket.org/gabrielmccallin/shiva/branches/compare/v0.6.1%0Dv0.6.0#diff)

`[0.6.0]`  [https://bitbucket.org/gabrielmccallin/shiva/branches/compare/v0.6.1%0Dv0.5.14#diff](https://bitbucket.org/gabrielmccallin/shiva/branches/compare/v0.6.1%0Dv0.5.14#diff)