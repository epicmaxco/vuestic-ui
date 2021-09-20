import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaColorInput from 'vuestic-ui/src/components/va-color-input/VaColorInput.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('colorInput.title'),
  DocsHelper.paragraph('colorInput.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'colorInput.examples.default.title',
    'colorInput.examples.default.text',
    'va-color-input/Default',
  ),
  ...DocsHelper.exampleBlock(
    'colorInput.examples.disabled.title',
    'colorInput.examples.disabled.text',
    'va-color-input/Disabled',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaColorInput, apiOptions),
]

export default config
