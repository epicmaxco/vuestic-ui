import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaSwitch from 'vuestic-ui/src/components/va-switch/VaSwitch.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('switch.title'),
  DocsHelper.paragraph('switch.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'switch.examples.default.title',
    'switch.examples.default.text',
    'va-switch/Default',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.color.title',
    'switch.examples.color.text',
    'va-switch/Color',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.label.title',
    'switch.examples.label.text',
    'va-switch/Label',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.customLabel.title',
    'switch.examples.customLabel.text',
    'va-switch/CustomLabel',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.innerLabel.title',
    'switch.examples.innerLabel.text',
    'va-switch/InnerLabel',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.size.title',
    'switch.examples.size.text',
    'va-switch/Size',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.state.title',
    'switch.examples.state.text',
    'va-switch/State',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.loading.title',
    'switch.examples.loading.text',
    'va-switch/Loading',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.error.title',
    'switch.examples.error.text',
    'va-switch/Error',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaSwitch, apiOptions),
]

export default config
