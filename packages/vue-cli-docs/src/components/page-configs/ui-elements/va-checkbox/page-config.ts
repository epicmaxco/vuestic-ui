import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaCheckbox from 'vuestic-ui-dev/src/components/vuestic-components/va-checkbox/VaCheckbox.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'checkbox.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'checkbox.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'checkbox.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'checkbox.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-checkbox/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'checkbox.examples.label.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'checkbox.examples.label.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-checkbox/Label',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'checkbox.examples.indeterminate.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-checkbox/Indeterminate',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'checkbox.examples.coloring.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-checkbox/Coloring',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'checkbox.examples.array.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'checkbox.examples.array.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-checkbox/Array',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'checkbox.examples.error.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'checkbox.examples.error.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-checkbox/Error',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaCheckbox,
    apiOptions,
  },
] as ApiDocsBlock[]
