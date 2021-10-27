import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaImage from 'vuestic-ui/src/components/va-image/VaImage.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/image'

const config: ApiDocsBlock[] = [
  DocsHelper.title('image.title'),
  DocsHelper.paragraph('image.summaryText'),

  DocsHelper.subtitle('all.examples'),

  DocsHelper.headline('image.examples.default.title'),
  DocsHelper.example(configPath, 'Default'),

  ...DocsHelper.exampleBlock(
    'image.examples.ratio.title',
    'image.examples.ratio.text',
    configPath,
    'Ratio',
  ),
  ...DocsHelper.exampleBlock(
    'image.examples.contain.title',
    'image.examples.contain.text',
    configPath,
    'Contain',
  ),
  ...DocsHelper.exampleBlock(
    'image.examples.defaultSlot.title',
    'image.examples.defaultSlot.text',
    configPath,
    'DefaultSlot',
  ),
  ...DocsHelper.exampleBlock(
    'image.examples.loaderSlot.title',
    'image.examples.loaderSlot.text',
    configPath,
    'LoaderSlot',
  ),
  ...DocsHelper.exampleBlock(
    'image.examples.errorSlot.title',
    'image.examples.errorSlot.text',
    configPath,
    'ErrorSlot',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaImage, apiOptions),
]

export default config
