import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaHover from 'vuestic-ui/src/components/va-hover/VaHover.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'hover.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'hover.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'hover.examples.vModel.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'hover.examples.vModel.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-hover/VModel',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'hover.examples.slot.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'hover.examples.slot.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-hover/Slot',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'hover.examples.disabled.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'hover.examples.disabled.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-hover/Disabled',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },

  DocsHelper.api(VaHover, apiOptions),

  {
    type: BlockType.SUBTITLE,
    translationString: 'all.faq',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'hover.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'hover.faq.questions[0].answer',
  },
]

export default config
