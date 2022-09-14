import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaAffix from 'vuestic-ui/src/components/va-affix/VaAffix.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-affix/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('affix.title'),
  block.paragraph('affix.summaryText'),

  block.subtitle('all.examples'),

  block.headline('affix.examples.top.title'),
  block.example('Top'),

  block.headline('affix.examples.bottom.title'),
  block.example('Bottom'),

  block.headline('affix.examples.default.title'),
  block.example('Default'),

  block.subtitle('all.api'),
  block.api(VaAffix, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
