import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaOptionList from 'vuestic-ui/src/components/va-option-list/VaOptionList.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-option-list'

const config: ApiDocsBlock[] = [
  DocsHelper.title('optionList.title'),
  DocsHelper.paragraph('optionList.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'optionList.examples.default.title',
    'optionList.examples.default.text',
    configPath,
    'Example',
  ),
  ...DocsHelper.exampleBlock(
    'optionList.examples.withRadio.title',
    'optionList.examples.withRadio.text',
    configPath,
    'WithRadio',
  ),
  ...DocsHelper.exampleBlock(
    'optionList.examples.withSwitch.title',
    'optionList.examples.withSwitch.text',
    configPath,
    'WithSwitch',
  ),
  ...DocsHelper.exampleBlock(
    'optionList.examples.withComplexData.title',
    'optionList.examples.withComplexData.text',
    configPath,
    'WithComplexData',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaOptionList, apiOptions),
]

export default config
