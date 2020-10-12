import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaButtonToggle from 'vuestic-ui/src/components/vuestic-components/va-button-toggle/VaButtonToggle.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'buttonToggle.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonToggle.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'buttonToggle.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonToggle.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button-toggle/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'buttonToggle.examples.colors.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonToggle.examples.colors.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button-toggle/Colors',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'buttonToggle.examples.sizes.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonToggle.examples.sizes.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button-toggle/Sizes',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'buttonToggle.examples.styles.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonToggle.examples.styles.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button-toggle/Styles',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'buttonToggle.examples.disabled.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonToggle.examples.disabled.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button-toggle/Disabled',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaButtonToggle,
    apiOptions,
  },
] as ApiDocsBlock[]
