export const generalScheme = `
// {{ $t('cssVariables.convention.generalScheme') }}

{{ $t('cssVariables.convention.scheme') }}: \`--[state*]-[group-of-elements*]-[property]\`

* - {{ $t('cssVariables.convention.unnecessary') }}

[state] - {{ $t('cssVariables.convention.state') }} (outline/square/flat/primary/secondary)
[group-of-elements] - {{ $t('cssVariables.convention.groupOfElements') }} (block/control/text-block/form/ul)
[property] - {{ $t('cssVariables.convention.property') }} (color/transition/border-radius)

{{ $t('cssVariables.convention.example') }}: --primary-block-border-radius: 0.375rem;
`
