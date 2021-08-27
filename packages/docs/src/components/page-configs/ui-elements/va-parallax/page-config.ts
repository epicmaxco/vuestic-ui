import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaParallax from 'vuestic-ui/src/components/va-parallax/VaParallax.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'parallax.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'parallax.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'parallax.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'parallax.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-parallax/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'parallax.examples.custom.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'parallax.examples.custom.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-parallax/Custom',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'parallax.examples.reversed.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'parallax.examples.reversed.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-parallax/Reversed',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'parallax.examples.slot.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'parallax.examples.slot.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-parallax/Slot',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },

  DocsHelper.api(VaParallax, apiOptions),
]

export default config
