import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaImage from 'vuestic-ui/src/components/va-image/VaImage.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-image/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('image.title'),
  block.paragraph('image.summaryText'),

  block.subtitle('all.examples'),

  block.headline('image.examples.default.title'),
  block.example('Default'),

  ...block.exampleBlock(
    'image.examples.ratio.title',
    'image.examples.ratio.text',
    'Ratio',
  ),
  ...block.exampleBlock(
    'image.examples.contain.title',
    'image.examples.contain.text',
    'Contain',
  ),
  ...block.exampleBlock(
    'image.examples.defaultSlot.title',
    'image.examples.defaultSlot.text',
    'DefaultSlot',
  ),
  ...block.exampleBlock(
    'image.examples.loaderSlot.title',
    'image.examples.loaderSlot.text',
    'LoaderSlot',
  ),
  ...block.exampleBlock(
    'image.examples.errorSlot.title',
    'image.examples.errorSlot.text',
    'ErrorSlot',
  ),

  block.subtitle('all.api'),
  block.api(VaImage, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
