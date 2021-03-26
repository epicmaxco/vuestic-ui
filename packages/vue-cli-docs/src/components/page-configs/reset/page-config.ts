import { BlockType, ApiDocsBlock } from '../../../types/configTypes'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'reset.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'reset.description',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'reset.features.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'reset.features.info',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'reset.features.list',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'reset.features.more',
  },
] as ApiDocsBlock[]
