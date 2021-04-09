import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '@/helpers/DocsHelper'

const generalScheme = `
// General scheme - for general styles

Scheme: \`--[state*]-[group-of-elements*]-[property]\`

* - is unnecessary part needed only for specific cases.

[state] - state of elements or its preset. outline/square/flat/primary/secondary
[group-of-elements*] - state of elements or its preset. outline/square/flat/primary/secondary
[property] - common css property. color/transition/border-radius

example: --primary-block-border-radius: 0.375rem;
`

const componentSheme = `
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

const overriding = `
:root {
--va-button-sm-font-size: 1rem
}
`
export default [
  DocsHelper.title('cssVariables.title'),
  DocsHelper.paragraph('cssVariables.description'),
  DocsHelper.subtitle('cssVariables.convention.title'),
  DocsHelper.paragraph('cssVariables.convention.description'),
  DocsHelper.code(generalScheme),
  DocsHelper.code(componentSheme, 'markdown'),
  DocsHelper.subtitle('cssVariables.overriding.title'),
  DocsHelper.paragraph('cssVariables.overriding.description'),
  DocsHelper.code(overriding),
] as ApiDocsBlock[]
