import { ApiDocsBlock, BlockType } from '../../../types/configTypes'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'rating.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'rating.basic.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.basic.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/Basic',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'rating.advanced.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.advanced.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.advanced.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/WithColors',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'rating.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.api.paragraph',
  },
  // TODO: here comes api component
  {
    type: BlockType.SUBTITLE,
    translationString: 'rating.faq.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.faq.questions[0].answer',
  },
]

export default config
