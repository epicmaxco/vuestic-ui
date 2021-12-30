import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const scheme = `
// The scheme for color styles
Scheme: \`--va - [name]\`
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

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('colors.title'),
  block.paragraph('colors.description'),
  block.example('CustomAlert'),
  block.subtitle('colors.syntax.title'),
  block.paragraph('colors.syntax.description'),
  block.code(scheme),
  block.paragraph('colors.syntax.colorsUsed'),
  block.subtitle('colors.defaultColorThemes.title'),
  block.paragraph('colors.defaultColorThemes.description'),
  block.example('DefaultColors', { hideCode: true }),
  block.subtitle('colors.reactivity.subtitle'),
  block.paragraph('colors.reactivity.about'),
  block.paragraph('colors.reactivity.additional'),
]

export default config
