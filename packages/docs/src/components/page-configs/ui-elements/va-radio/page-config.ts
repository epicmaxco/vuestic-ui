import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaRadio from 'vuestic-ui/src/components/va-radio/VaRadio.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('radio.title'),
  DocsHelper.paragraph('radio.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'radio.examples.default.title',
    'radio.examples.default.text',
    'va-radio/Default',
  ),
  ...DocsHelper.exampleBlock(
    'radio.examples.color.title',
    'radio.examples.color.text',
    'va-radio/Color',
  ),
  ...DocsHelper.exampleBlock(
    'radio.examples.customLabels.title',
    'radio.examples.customLabels.text',
    'va-radio/CustomLabels',
  ),
  ...DocsHelper.exampleBlock(
    'radio.examples.disabled.title',
    'radio.examples.disabled.text',
    'va-radio/Disabled',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaRadio, apiOptions),
]

export default config
