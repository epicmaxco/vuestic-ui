import { BlockType } from '../../../types/configTypes'
import RatingColorDocsDemo from '../../rating-docs-demo/RatingColorDocsDemo.vue'

export default [
  {
    type: BlockType.TITLE,
    text: 'rating.title',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'rating.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    text: 'rating.basic.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'rating.basic.paragraph',
  },
  {
    type: BlockType.CODE,
    code: `<va-rating
  v-model="value"
/>`,
  },
  {
    type: BlockType.SUBTITLE,
    text: 'rating.advanced.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    text: 'rating.advanced.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'rating.advanced.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: RatingColorDocsDemo,
  },
  {
    type: BlockType.CODE,
    code: `<va-rating color="success" v-model="value" />

<va-rating color="info" v-model="value" />

<va-rating color="danger" v-model="value" />

<va-rating color="warning" v-model="value" />`,
  },
  {
    type: BlockType.SUBTITLE,
    text: 'rating.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'rating.api.paragraph',
  },
  // TODO: here comes api component
  {
    type: BlockType.SUBTITLE,
    text: 'rating.faq.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    text: 'rating.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'rating.faq.questions[0].answer',
  },
]
