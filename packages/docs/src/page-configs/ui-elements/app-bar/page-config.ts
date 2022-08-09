import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaAppBar from 'vuestic-ui/src/components/va-app-bar/VaAppBar.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-app-bar/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('appBar.title'),
  block.paragraph('appBar.summaryText'),
  block.subtitle('all.examples'),
  block.headline('appBar.examples.default.title'),
  block.paragraph('appBar.examples.default.text'),
  block.example('Default'),
  block.headline('appBar.examples.color.title'),
  block.paragraph('appBar.examples.color.text'),
  block.example('Color'),
  block.headline('appBar.examples.fixed.title'),
  block.paragraph('appBar.examples.fixed.text'),
  block.example('Fixed'),
  block.headline('appBar.examples.hide.title'),
  block.paragraph('appBar.examples.hide.text'),
  block.example('Hide'),
  block.headline('appBar.examples.shadow.title'),
  block.paragraph('appBar.examples.shadow.text'),
  block.example('Shadow'),

  block.subtitle('all.api'),
  block.api(VaAppBar, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
