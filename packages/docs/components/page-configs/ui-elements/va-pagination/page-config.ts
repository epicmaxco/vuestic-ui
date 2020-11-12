import { ApiDocsBlock, BlockType } from '../../../../types/configTypes'
import VaPagination from 'vuestic-ui/src/components/vuestic-components/va-pagination/VaPagination.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'pagination.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.examples.colors.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.colors.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/Colors',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.examples.sizes.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.sizes.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/Sizes',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.examples.limitVisible.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.limitVisible.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/LimitVisible',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.examples.icons.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.icons.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/Icons',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.examples.withInput.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.withInput.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/WithInput',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'pagination.examples.totalAndPageSize.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.totalAndPageSize.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-pagination/TotalAndPageSize',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
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
