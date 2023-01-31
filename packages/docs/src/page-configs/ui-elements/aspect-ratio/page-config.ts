import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaAspectRatio from 'vuestic-ui/src/components/va-aspect-ratio/VaAspectRatio.vue'
import apiOptions from './api-options'

import type { ApiDocsBlock } from '@/types/configTypes'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-aspect-ratio/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('aspectRatio.title'),
  block.paragraph('aspectRatio.summaryText'),

  block.subtitle('all.examples'),

  block.headline('aspectRatio.examples.default.title'),
  block.example('Default'),

  block.headline('aspectRatio.examples.withOtherComponents.title'),
  block.paragraph('aspectRatio.examples.withOtherComponents.text'),
  block.example('WithOtherComponents'),

  block.subtitle('all.api'),
  block.api(VaAspectRatio, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
