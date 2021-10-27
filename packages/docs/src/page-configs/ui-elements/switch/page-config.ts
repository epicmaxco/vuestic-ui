import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaSwitch from 'vuestic-ui/src/components/va-switch/VaSwitch.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/switch'

const config: ApiDocsBlock[] = [
  DocsHelper.title('switch.title'),
  DocsHelper.paragraph('switch.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'switch.examples.default.title',
    'switch.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.color.title',
    'switch.examples.color.text',
    configPath,
    'Color',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.label.title',
    'switch.examples.label.text',
    configPath,
    'Label',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.customLabel.title',
    'switch.examples.customLabel.text',
    configPath,
    'CustomLabel',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.innerLabel.title',
    'switch.examples.innerLabel.text',
    configPath,
    'InnerLabel',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.size.title',
    'switch.examples.size.text',
    configPath,
    'Size',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.state.title',
    'switch.examples.state.text',
    configPath,
    'State',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.loading.title',
    'switch.examples.loading.text',
    configPath,
    'Loading',
  ),
  ...DocsHelper.exampleBlock(
    'switch.examples.customValue.title',
    'switch.examples.customValue.text',
    configPath,
    'CustomValue',
  ),
  DocsHelper.headline('switch.examples.indeterminate.title'),
  DocsHelper.example(configPath, 'Indeterminate'),
  ...DocsHelper.exampleBlock(
    'switch.examples.error.title',
    'switch.examples.error.text',
    configPath,
    'Error',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaSwitch, apiOptions),
]

export default config
