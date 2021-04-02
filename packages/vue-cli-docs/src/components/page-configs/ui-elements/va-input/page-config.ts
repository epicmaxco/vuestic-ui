import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaInput
  from 'vuestic-ui/src/components/vuestic-components/va-input/VaInput.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'input.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'input.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'input.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'input.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-input/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'input.examples.hint.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'input.examples.hint.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-input/Hint',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'input.examples.validate.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'input.examples.validate.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-input/Validate',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'input.examples.slots.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'input.examples.slots.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-input/Slots',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'input.examples.textarea.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'input.examples.textarea.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-input/Textarea',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'input.examples.mask.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'input.examples.mask.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-input/Mask',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    apiOptions,
    type: BlockType.API,
    componentOptions: VaInput,
  },
] as ApiDocsBlock[]
