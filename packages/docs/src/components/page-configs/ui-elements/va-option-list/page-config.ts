import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaOptionList from 'vuestic-ui/src/components/va-option-list/VaOptionList.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('optionList.title'),
  DocsHelper.paragraph('optionList.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'optionList.examples.default.title',
    'optionList.examples.default.text',
    'va-option-list/Example',
  ),
  ...DocsHelper.exampleBlock(
    'optionList.examples.withRadio.title',
    'optionList.examples.withRadio.text',
    'va-option-list/WithRadio',
  ),
  ...DocsHelper.exampleBlock(
    'optionList.examples.withSwitch.title',
    'optionList.examples.withSwitch.text',
    'va-option-list/WithSwitch',
  ),
  ...DocsHelper.exampleBlock(
    'optionList.examples.withComplexData.title',
    'optionList.examples.withComplexData.text',
    'va-option-list/WithComplexData',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaOptionList, apiOptions),
]

export default config
