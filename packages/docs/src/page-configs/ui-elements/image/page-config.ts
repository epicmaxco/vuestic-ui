import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaImage from 'vuestic-ui/src/components/va-image/VaImage.vue'
import apiOptions from './api-options'

import type { ApiDocsBlock } from '@/types/configTypes'

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
    'image.examples.fit.title',
    'image.examples.fit.text',
    'Fit',
  ),
  ...block.exampleBlock(
    'image.examples.defaultSlot.title',
    'image.examples.defaultSlot.text',
    'DefaultSlot',
  ),
  ...block.exampleBlock(
    'image.examples.slots.title',
    'image.examples.slots.text',
    'Slots',
  ),
  ...block.exampleBlock(
    'image.examples.srcSet.title',
    'image.examples.srcSet.text',
    'SrcSet',
  ),
  ...block.exampleBlock(
    'image.examples.lazy.title',
    'image.examples.lazy.text',
    'Lazy',
  ),

  ...block.exampleBlock(
    'image.examples.viewer.title',
    'image.examples.viewer.text',
    'Viewer',
  ),

  block.subtitle('all.api'),
  block.api(VaImage, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
