import { ApiDocsBlock, BlockType } from '../../../types/configTypes'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'switch.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'switch.basic.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.basic.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Basic',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'switch.advanced.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.advanced.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.advanced.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/WithColors',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'switch.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.api.paragraph',
  },
  // TODO: here comes api component
  {
    type: BlockType.SUBTITLE,
    translationString: 'switch.faq.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.faq.questions[0].answer',
  },
]

export default config
