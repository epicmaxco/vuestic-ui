import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaCard
  from 'vuestic-ui/src/components/vuestic-components/va-card/VaCard.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'card.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'card.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'card.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'card.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-card/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'card.examples.colorAndGradient.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-card/ColorAndGradient',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'card.examples.tag.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'card.examples.tag.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-card/Tag',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'card.examples.borderAndShape.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-card/BorderAndShape',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'card.examples.disabled.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-card/Disabled',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'card.examples.link.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-card/Link',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'card.examples.stripe.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-card/Stripe',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'card.examples.image.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-card/Image',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaCard,
    apiOptions,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.faq',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'card.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'card.faq.questions[0].answer',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'card.faq.questions[1].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'card.faq.questions[1].answer',
  },
] as ApiDocsBlock[]
