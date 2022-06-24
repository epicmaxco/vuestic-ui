import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaParallax from 'vuestic-ui/src/components/va-parallax/VaParallax.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-parallax/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('parallax.title'),
  block.paragraph('parallax.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'parallax.examples.default.title',
    'parallax.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'parallax.examples.custom.title',
    'parallax.examples.custom.text',
    'Custom',
  ),
  ...block.exampleBlock(
    'parallax.examples.reversed.title',
    'parallax.examples.reversed.text',
    'Reversed',
  ),
  ...block.exampleBlock(
    'parallax.examples.slot.title',
    'parallax.examples.slot.text',
    'Slot',
  ),

  block.subtitle('all.api'),
  block.api(VaParallax, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
