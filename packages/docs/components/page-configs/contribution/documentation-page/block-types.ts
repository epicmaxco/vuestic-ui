export const codeForCodeblock = '<div>Code string</div>'

export const blocktypes = {
  title: 'DocsHelper.title(\'translation.path\')',
  subtitle: 'DocsHelper.subtitle(\'translation.path\')',
  headline: 'DocsHelper.headline(\'translation.path\')',
  paragraph: 'DocsHelper.paragraph(\'translation.path\')',
  example: 'DocsHelper.example(\'va-component/ComponentName\')',
  code: `DocsHelper.code(${codeForCodeblock})`,
  api: 'DocsHelper.api(VaComponent, apiOptions)',
}
