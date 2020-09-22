import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaButtonGroup from 'vuestic-ui/src/components/vuestic-components/va-button-group/VaButtonGroup.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'buttonGroup.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonGroup.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'buttonGroup.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonGroup.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button-group/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'buttonGroup.examples.colors.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonGroup.examples.colors.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button-group/Colors',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'buttonGroup.examples.sizes.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonGroup.examples.sizes.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button-group/Sizes',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'buttonGroup.examples.styles.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonGroup.examples.styles.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button-group/Styles',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'buttonGroup.examples.icons.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonGroup.examples.icons.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button-group/Icons',
  },
  {
    type: BlockType.API,
    componentOptions: VaButtonGroup,
    apiOptions,
  },
] as ApiDocsBlock[]
