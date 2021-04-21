import { ApiDocsBlock, BlockType } from '../../../../types/configTypes'
import apiOptions from './api-options'
import VaButton from 'vuestic-ui/src/components/vuestic-components/va-button/VaButton.vue'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'button.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'button.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'button.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'button.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'button.examples.withColor.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'button.examples.withColor.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button/WithColor',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'button.examples.withSize.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'button.examples.withSize.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button/WithSize',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'button.examples.withStyle.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'button.examples.withStyle.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button/WithStyle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'button.examples.withIcon.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'button.examples.withIcon.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button/WithIcon',
  },
  {
    type: BlockType.API,
    componentOptions: VaButton,
    apiOptions,
  },
] as ApiDocsBlock[]
