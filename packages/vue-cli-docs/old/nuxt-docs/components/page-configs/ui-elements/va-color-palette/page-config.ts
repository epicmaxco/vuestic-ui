import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaColorPalette from 'vuestic-ui/src/components/vuestic-components/va-color-palette/VaColorPalette.vue'
import VaColorPaletteAdvanced from 'vuestic-ui/src/components/vuestic-components/va-color-palette/VaColorPaletteAdvanced.vue'
import apiOptions, { apiOptionsAdvanced } from './api-options'

export default [
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
    type: BlockType.HEADLINE,
    translationString: 'colorPalette.examples.advanced.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorPalette.examples.advanced.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-color-palette/Advanced',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'colorPalette.api.colorPalette',
  },
  {
    type: BlockType.API,
    componentOptions: VaColorPalette,
    apiOptions,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'colorPalette.api.colorPaletteAdvanced',
  },
  {
    type: BlockType.API,
    componentOptions: VaColorPaletteAdvanced,
    apiOptions: apiOptionsAdvanced,
  },
] as ApiDocsBlock[]
