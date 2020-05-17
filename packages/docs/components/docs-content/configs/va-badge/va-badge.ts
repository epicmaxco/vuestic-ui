import { BlockType } from '../../../../types/configTypes'
import { vaBadgeApiOptions } from './vaBadgeApiOptions'
import VaBadge from 'vuestic-ui/src/components/vuestic-components/va-badge/VaBadge.vue'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'badge.title',
  },
  // {
  //   type: BlockType.PARAGRAPH,
  //   translationString: 'badge.paragraph',
  // },
  // {
  //   type: BlockType.SUBTITLE,
  //   translationString: 'badge.demo.subtitle',
  // },
  // {
  //   type: BlockType.HEADLINE,
  //   translationString: 'badge.demo.top.headline',
  // },
  // {
  //   type: BlockType.EXAMPLE,
  //   component: 'va-badge/Top',
  // },
  // {
  //   type: BlockType.HEADLINE,
  //   translationString: 'badge.demo.target.headline',
  // },
  // {
  //   type: BlockType.EXAMPLE,
  //   component: 'va-badge/Target',
  // },
  // {
  //   type: BlockType.HEADLINE,
  //   translationString: 'badge.demo.bottom.headline',
  // },
  // {
  //   type: BlockType.EXAMPLE,
  //   component: 'va-badge/Bottom',
  // },
  // {
  //   type: BlockType.SUBTITLE,
  //   translationString: 'badge.api.subtitle',
  // },
  // {
  //   type: BlockType.PARAGRAPH,
  //   translationString: 'badge.api.paragraph',
  // },
  {
    type: BlockType.API,
    componentOptions: VaBadge,
    apiOptions: vaBadgeApiOptions,
  },
]
