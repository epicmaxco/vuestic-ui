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
    translationString: 'button.examples.withGradient.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'button.examples.withGradient.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button/WithGradient',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'button.examples.withTextColor.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'button.examples.withTextColor.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button/WithTextColor',
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
    type: BlockType.HEADLINE,
    translationString: 'button.examples.withConfig.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'button.examples.withConfig.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button/WithConfig',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'button.examples.withLoading.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'button.examples.withLoading.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button/WithLoading',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'button.examples.disabled.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'button.examples.disabled.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button/Disabled',
  },
  {
    type: BlockType.API,
    componentOptions: VaButton,
    apiOptions,
  },
] as ApiDocsBlock[]
