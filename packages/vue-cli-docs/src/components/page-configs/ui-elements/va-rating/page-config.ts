import { ApiDocsBlock, BlockType } from '../../../../types/configTypes'
import VaRating from 'vuestic-ui-dev/src/components/vuestic-components/va-rating/VaRating.vue'
import apiOptions from './api-options'
import { VueConstructor } from 'vue-class-component'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'rating.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.examples.size.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.size.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/Size',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.examples.hover.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.hover.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/Hover',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.examples.halves.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.halves.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/Halves',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.examples.numbers.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.numbers.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/Numbers',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.examples.texts.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.texts.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/Texts',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.examples.clearable.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.clearable.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/Clearable',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.examples.customIcons.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.customIcons.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/CustomIcons',
  },
  {
    type: BlockType.API,
    componentOptions: VaRating,
    apiOptions: apiOptions as unknown as VueConstructor,
  },
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
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.faq.questions[1].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.faq.questions[1].answer',
  },
] as ApiDocsBlock[]
