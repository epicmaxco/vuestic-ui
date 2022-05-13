export const componentScheme = `
// {{ $t('cssVariables.convention.componentScheme') }}

{{ $t('cssVariables.convention.scheme') }}: \`--[component-name]-[state*]-[nested-element*]-[size*]-[property]\`

* - {{ $t('cssVariables.convention.unnecessary') }}

[component-name] - {{ $t('cssVariables.convention.componentName') }} (va-button/va-badge)
[state] - {{ $t('cssVariables.convention.state') }} (outline/square/flat/primary/secondary)
[nested-element] - {{ $t('cssVariables.convention.nestedElement') }} (content/wrapper)
[size] - {{ $t('cssVariables.convention.size') }} (sm/lg)
[property] - {{ $t('cssVariables.convention.property') }} (color/transition/border-radius)

{{ $t('cssVariables.convention.example) }}:   --va-button-sm-font-size: 0.875rem;
`;
