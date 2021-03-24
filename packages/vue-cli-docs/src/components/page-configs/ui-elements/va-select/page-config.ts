import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaSelect
  from 'vuestic-ui-dev/src/components/vuestic-components/va-select/VaSelect.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'select.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'select.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'select.examples.default',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-select/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'select.examples.variations.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'select.examples.variations.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-select/Variations',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'select.examples.decorators',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-select/Decorators',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'select.examples.slots.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'select.examples.slots.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-select/Slots',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'select.examples.state.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'select.examples.state.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-select/State',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'select.examples.chips.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'select.examples.chips.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-select/Chips',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'select.examples.searchable.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'select.examples.searchable.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-select/Searchable',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'select.examples.allowCreate.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'select.examples.allowCreate.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-select/AllowCreate',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'select.examples.validation.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'select.examples.validation.text',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'select.examples.keyboardNavigation.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'select.examples.keyboardNavigation.moves',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'select.examples.keyboardNavigation.selects',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'select.examples.keyboardNavigation.hints',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-select/Validation',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaSelect,
    apiOptions,
  },
] as ApiDocsBlock[]
