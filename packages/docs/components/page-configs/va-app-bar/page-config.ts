import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaAppBar from 'vuestic-ui/src/components/vuestic-components/va-app-bar/VaAppBar.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'appBar.title',
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
    componentOptions: VaAppBar,
    apiOptions,
  },
] as ApiDocsBlock[]
