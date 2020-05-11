import { ApiDocsBlock, BlockType } from '../../../types/configTypes'
import VaPaginationApi from '../api/VaPaginationApi.vue'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'pagination.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'pagination.basic.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.basic.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/Basic',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'pagination.examples.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.paragraph',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.examples.limitVisible.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.limitVisible.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/LimitVisible',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.examples.withInput.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.withInput.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/WithInput',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.examples.totalAndPageSize.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.totalAndPageSize.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/TotalAndPageSize',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'pagination.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.api.paragraph',
  },
  {
    type: BlockType.API,
    component: VaPaginationApi,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'pagination.faq.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.faq.questions[0].answer',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.faq.questions[1].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.faq.questions[1].answer',
  },
]

export default config
