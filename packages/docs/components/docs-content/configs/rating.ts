import { BlockType } from '../../../types/configTypes'
import RatingColorDocsDemo from '../../rating-docs-demo/RatingColorDocsDemo.vue'

export default [
  {
    type: BlockType.TITLE,
    text: 'rating.title',
  },
  {
    type: BlockType.COMPONENT,
    component: RatingColorDocsDemo,
  },
]
