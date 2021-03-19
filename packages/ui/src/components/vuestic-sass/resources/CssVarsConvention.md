# Css variables convention

## General
Schema: `--[state*]-[property]`

* `state` - state of elements or its preset. outline/square/flat/primary/secondary
* `property` - common css property. color/transition/border-radius


### Components

Schema: `--[component-name]-[state*]-[nested-element*]-[size*]-[property]`

* `component-name` - component name started with va- prefix. va-button/va-badge
* `state` - state of elements or its preset. outline/square/flat/primary/secondary
* `nested-element` - some element that can be nested in root component. content/wrapper
* `size` - size of target element. sm/lg
* `property` - common css property. color/transition/border-radius

`*` - is unnecessary part needed only for specific cases.
