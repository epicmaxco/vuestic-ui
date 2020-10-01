import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaColorInput from 'vuestic-ui/src/components/vuestic-components/va-color-input/VaColorInput.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'colorInput.title',
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
    componentOptions: VaColorInput,
    apiOptions,
  },
] as ApiDocsBlock[]
