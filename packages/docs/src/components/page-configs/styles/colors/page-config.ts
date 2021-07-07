import { ApiDocsBlock } from '@/types/configTypes'
import { DocsHelper } from '@/helpers/DocsHelper'

const scheme = `
// The scheme for color styles

Scheme: \`--va-[name]\`

[name] - the name of the color specified in the Colors Config

Example:
  const app = createApp(App)
  app.use(VuesticPlugin, {
    colors: {
      primary: '#23e066',
      custom: '#d0f55d',
    },
  })

Available colors:
  --va-primary: #23e066
  --va-custom: #d0f55d
`

export default [
  DocsHelper.title('colors.title'),
  DocsHelper.paragraph('colors.description'),
  DocsHelper.example('color-variables/ColorBorder'),
  DocsHelper.subtitle('colors.syntax.title'),
  DocsHelper.paragraph('colors.syntax.description'),
  DocsHelper.code(scheme),
  DocsHelper.paragraph('colors.syntax.colorsUsed'),
  DocsHelper.subtitle('colors.defaultColorThemes.title'),
  DocsHelper.paragraph('colors.defaultColorThemes.description'),
  DocsHelper.example('color-variables/DefaultColors', { hideCode: true }),
  DocsHelper.subtitle('colors.reactivity.subtitle'),
  DocsHelper.paragraph('colors.reactivity.about'),
  DocsHelper.paragraph('colors.reactivity.additional'),
] as ApiDocsBlock[]
