import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaRadio from 'vuestic-ui/src/components/va-radio/VaRadio.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/radio'

const config: ApiDocsBlock[] = [
  DocsHelper.title('radio.title'),
  DocsHelper.paragraph('radio.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'radio.examples.default.title',
    'radio.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'radio.examples.color.title',
    'radio.examples.color.text',
    configPath,
    'Color',
  ),
  ...DocsHelper.exampleBlock(
    'radio.examples.customLabels.title',
    'radio.examples.customLabels.text',
    configPath,
    'CustomLabels',
  ),
  ...DocsHelper.exampleBlock(
    'radio.examples.disabled.title',
    'radio.examples.disabled.text',
    configPath,
    'Disabled',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaRadio, apiOptions),
]

export default config
