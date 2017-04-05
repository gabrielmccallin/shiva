# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
### Changed

## [1.0.0] - 2017-03-14
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


## [0.6.2] - 2017-03-03
### Added
### Changed
- Some default style changes
- Dropdown component animation on expand / contract


## [0.6.1] - 2017-03-03
### Added
### Changed
- README


## [0.6.0] - 2017-03-02
### Added
### Changed
- Button checks for empty config object
- Button icon improvements
- Dropdown config object takes item styles

[Unreleased]: https://bitbucket.org/gabrielmccallin/shiva/branches/compare/master%0Dv1.0.0
[1.0.0]: https://bitbucket.org/gabrielmccallin/shiva/branches/compare/v1.0.0%0Dv0.6.2#diff
[0.6.2]: https://bitbucket.org/gabrielmccallin/shiva/branches/compare/v0.6.2%0Dv0.6.1#diff
[0.6.1]: https://bitbucket.org/gabrielmccallin/shiva/branches/compare/v0.6.1%0Dv0.6.0#diff
[0.6.0]: https://bitbucket.org/gabrielmccallin/shiva/branches/compare/v0.6.1%0Dv0.5.14#diff