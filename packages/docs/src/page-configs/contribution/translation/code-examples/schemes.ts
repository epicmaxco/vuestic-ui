export const schemeBasic = `
{{ $t('translation.code.misc.scheme') }}: \`$t-ignore('{{ $t('translation.code.misc.schemeText') }}')\`

{{ $t('translation.code.misc.output') }}: \`$t('translation.code.misc.outputText')\`
`

export const schemeMustache = `
{{ $t('translation.code.misc.scheme') }}: \`{{ $t-ignore('{{ $t('translation.code.misc.schemeText') }}') }}\`

{{ $t('translation.code.misc.output') }}: \`{{ $t('translation.code.misc.outputText') }}\`
`
