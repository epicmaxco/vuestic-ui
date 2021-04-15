import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaRadio from 'vuestic-ui/src/components/vuestic-components/va-radio/VaRadio.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'radio.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'radio.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'radio.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'radio.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-radio/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'radio.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'radio.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-radio/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'radio.examples.customLabels.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'radio.examples.customLabels.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-radio/CustomLabels',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'radio.examples.disabled.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'radio.examples.disabled.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-radio/Disabled',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaRadio,
    apiOptions,
  },
] as ApiDocsBlock[]
