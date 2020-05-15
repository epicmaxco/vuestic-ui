import { BlockType } from '../../../types/configTypes'
import { VueConstructor } from 'vue'
import VaAffix
  from 'vuestic-ui/src/components/vuestic-components/va-affix/VaAffix.vue'
import { vaAffixOptions } from './va-affix/apiConfig'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'affix.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'affix.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'affix.demo.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'affix.demo.top.headline',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-affix/Top',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'affix.demo.target.headline',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-affix/Target',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'affix.demo.bottom.headline',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-affix/Bottom',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'affix.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'affix.api.paragraph',
  },
  {
    type: BlockType.API,
    componentOptions: VaAffix as unknown as VueConstructor,
    apiOptions: vaAffixOptions,
  },
]
