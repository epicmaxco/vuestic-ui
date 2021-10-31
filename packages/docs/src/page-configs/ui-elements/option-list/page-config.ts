import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaOptionList from 'vuestic-ui/src/components/va-option-list/VaOptionList.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('optionList.title'),
  block.paragraph('optionList.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'optionList.examples.default.title',
    'optionList.examples.default.text',
    'Example',
  ),
  ...block.exampleBlock(
    'optionList.examples.withRadio.title',
    'optionList.examples.withRadio.text',
    'WithRadio',
  ),
  ...block.exampleBlock(
    'optionList.examples.withSwitch.title',
    'optionList.examples.withSwitch.text',
    'WithSwitch',
  ),
  ...block.exampleBlock(
    'optionList.examples.withComplexData.title',
    'optionList.examples.withComplexData.text',
    'WithComplexData',
  ),

  block.subtitle('all.api'),
  block.api(VaOptionList, apiOptions),
]

export default config
