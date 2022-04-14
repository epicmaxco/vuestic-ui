export const fontCodeExample = `
const fonts = [
  {
    name: 'fa4-{code}',
    resolve: ({ code }) => ({ class: \`fa fa-\${code}\` }),
    color: '#e0e0e0'
  },
  {
    name: 'fa5 {code}',
    resolve: ({ code }) => ({ class:\`fas fa-\${code} \` }),
  },
  {
    name: 'fa5 {code} {type}',
    // fas, fab, fad etc
    resolve: ({ code }) => ({ class: \`fa\${type} fa-\${code}\` }),
  },
  {
    name: 'flag-{code}-{size}',
    tag: 'span',
    resolve: ({ code }) => ({ class: \`flag-icon flag-icon-\${code} flag-icon-\${size}\` }),
  }
]
`

export const fontTransformationsExample = `
{{ $t('all.code.aliasAndFontExample.from') }} <va-icon name="fa4-phone" />
{{ $t('all.code.aliasAndFontExample.to') }}   <i class="fa fa-phone" style="color: #e0e0e0;"></i>

// Default solid
{{ $t('all.code.aliasAndFontExample.from') }} <va-icon name="fa5 phone" />
{{ $t('all.code.aliasAndFontExample.to') }}   <i class="fas fa-phone"></i>

// Light
{{ $t('all.code.aliasAndFontExample.from') }} <va-icon name="fa5 phone l" />
{{ $t('all.code.aliasAndFontExample.to') }}   <i class="fal fa-phone"></i>

// Duotone
{{ $t('all.code.aliasAndFontExample.from') }} <va-icon name="fa5 phone d" />
{{ $t('all.code.aliasAndFontExample.to') }}   <i class="fad fa-phone"></i>

{{ $t('all.code.aliasAndFontExample.from') }} <va-icon name="flag-gb-small" />
{{ $t('all.code.aliasAndFontExample.to') }}   <span class="flag-icon flag-icon-gb flag-icon-small"></span>
`
