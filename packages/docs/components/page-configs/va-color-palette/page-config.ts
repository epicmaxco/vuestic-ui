import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaColorPalette from 'vuestic-ui/src/components/vuestic-components/va-color-palette/VaColorPalette.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'colorPalette.title',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaColorPalette,
    apiOptions,
  },
] as ApiDocsBlock[]
