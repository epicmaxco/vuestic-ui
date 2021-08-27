export const componentScheme = `
// Component scheme - for component-level styles

Scheme: --[component-name]-[state*]-[nested-element*]-[size*]-[property]

* - is unnecessary part needed only for specific cases.

[component-name] - component name started with va- prefix. va-button/va-badge
[state] - state of elements or its preset. outline/square/flat/primary/secondary
[nested-element] - some element that can be nested in root component. content/wrapper
[size] - size of target element. sm/lg
[property] - common css property. color/transition/border-radius

example:   --va-button-sm-font-size: 0.875rem;
`
