import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import apiOptions from './api-options'
import VaBadge from 'vuestic-ui/src/components/vuestic-components/va-badge/VaBadge.vue'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'badge.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'badge.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'badge.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'badge.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-badge/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'badge.examples.position.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-badge/Position',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'badge.examples.color.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-badge/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'badge.examples.dot.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-badge/Dot',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'badge.examples.transparent.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-badge/Transparent',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'badge.examples.withCard.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-badge/WithCard',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'badge.examples.withAvatar.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-badge/WithAvatar',
  },
  {
    type: BlockType.API,
    componentOptions: VaBadge,
    apiOptions,
  },
] as ApiDocsBlock[]
