import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaOptionList from 'vuestic-ui/src/components/va-option-list/VaOptionList.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'optionList.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'optionList.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'optionList.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'optionList.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-option-list/Example',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'optionList.examples.withRadio.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'optionList.examples.withRadio.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-option-list/WithRadio',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'optionList.examples.withSwitch.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'optionList.examples.withSwitch.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-option-list/WithSwitch',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'optionList.examples.withComplexData.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'optionList.examples.withComplexData.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-option-list/WithComplexData',
  },

  DocsHelper.api(VaOptionList, apiOptions),
]

export default config
