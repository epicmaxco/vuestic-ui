import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaAlert from 'vuestic-ui/src/components/vuestic-components/va-alert/VaAlert.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'alert.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'alert.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'alert.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'alert.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-alert/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'alert.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'alert.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-alert/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'alert.examples.border.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'alert.examples.border.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-alert/Border',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'alert.examples.title.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'alert.examples.title.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-alert/Title',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'alert.examples.icon.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'alert.examples.icon.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-alert/Icon',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'alert.examples.closeable.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'alert.examples.closeable.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-alert/Closeable',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'alert.examples.center.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'alert.examples.center.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-alert/Center',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaAlert,
    apiOptions,
  },
] as ApiDocsBlock[]
