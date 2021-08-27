import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaColorPalette from 'vuestic-ui/src/components/va-color-palette/VaColorPalette.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'colorPalette.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorPalette.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'colorPalette.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorPalette.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-color-palette/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'colorPalette.examples.indicator.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorPalette.examples.indicator.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-color-palette/Indicator',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'colorPalette.api.colorPalette',
  },

  DocsHelper.api(VaColorPalette, apiOptions),
]

export default config
