import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaColorPicker from 'vuestic-ui/src/components/vuestic-components/va-color-picker/VaColorPicker.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'colorPicker.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorPicker.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'colorPicker.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorPicker.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-color-picker/Default',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaColorPicker,
    apiOptions,
  },
] as ApiDocsBlock[]
