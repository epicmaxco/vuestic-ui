import { ApiDocsBlock, BlockType } from '../../../types/configTypes'
import VaRating from 'vuestic-ui/src/components/vuestic-components/va-rating/VaRating.vue'
import apiOptions from './api-options'
import { VueConstructor } from 'vue'

export default [
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
    translationString: 'rating.examples.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.paragraph',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.examples.colorsAndSizes.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.colorsAndSizes.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/ColorsAndSizes',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.examples.hoverAndHalves.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.hoverAndHalves.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/HoverAndHalves',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'rating.examples.numbers.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.examples.numbers.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-rating/Numbers',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'rating.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'rating.api.paragraph',
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
