import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaBacktop from 'vuestic-ui/src/components/vuestic-components/va-backtop/VaBacktop.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'backtop.title',
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
    componentOptions: VaBacktop,
    apiOptions,
  },
] as ApiDocsBlock[]
