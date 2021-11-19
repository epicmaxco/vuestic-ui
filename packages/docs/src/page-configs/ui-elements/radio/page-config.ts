import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaRadio from 'vuestic-ui/src/components/va-radio/VaRadio.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('radio.title'),
  block.paragraph('radio.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'radio.examples.default.title',
    'radio.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'radio.examples.color.title',
    'radio.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'radio.examples.customLabels.title',
    'radio.examples.customLabels.text',
    'CustomLabels',
  ),
  ...block.exampleBlock(
    'radio.examples.disabled.title',
    'radio.examples.disabled.text',
    'Disabled',
  ),

  block.subtitle('all.api'),
  block.api(VaRadio, apiOptions),
]

export default config
