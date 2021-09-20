import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaImage from 'vuestic-ui/src/components/va-image/VaImage.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('image.title'),
  DocsHelper.paragraph('image.summaryText'),

  DocsHelper.subtitle('all.examples'),

  DocsHelper.headline('image.examples.default.title'),
  DocsHelper.example('va-image/Default'),

  ...DocsHelper.exampleBlock(
    'image.examples.ratio.title',
    'image.examples.ratio.text',
    'va-image/Ratio',
  ),
  ...DocsHelper.exampleBlock(
    'image.examples.contain.title',
    'image.examples.contain.text',
    'va-image/Contain',
  ),
  ...DocsHelper.exampleBlock(
    'image.examples.defaultSlot.title',
    'image.examples.defaultSlot.text',
    'va-image/DefaultSlot',
  ),
  ...DocsHelper.exampleBlock(
    'image.examples.loaderSlot.title',
    'image.examples.loaderSlot.text',
    'va-image/LoaderSlot',
  ),
  ...DocsHelper.exampleBlock(
    'image.examples.errorSlot.title',
    'image.examples.errorSlot.text',
    'va-image/ErrorSlot',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaImage, apiOptions),
]

export default config
