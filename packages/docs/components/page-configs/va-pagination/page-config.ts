import { ApiDocsBlock, BlockType } from '../../../types/configTypes'
import VaPagination from 'vuestic-ui/src/components/vuestic-components/va-pagination/VaPagination.vue'
import apiOptions from './api-options'

export default [
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
    translationString: 'pagination.examples.colors.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.colors.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/Colors',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.examples.sizes.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.sizes.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/Sizes',
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
    translationString: 'pagination.examples.icons.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.icons.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/Icons',
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
    componentOptions: VaPagination,
    apiOptions,
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
] as ApiDocsBlock[]
