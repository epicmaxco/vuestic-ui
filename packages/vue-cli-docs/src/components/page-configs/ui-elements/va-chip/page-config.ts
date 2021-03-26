import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaChip from 'vuestic-ui-dev/src/components/vuestic-components/va-chip/VaChip.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'chip.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'chip.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'chip.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'chip.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-chip/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'chip.examples.outline.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'chip.examples.outline.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-chip/Outline',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'chip.examples.flat.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'chip.examples.flat.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-chip/Flat',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'chip.examples.square.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'chip.examples.square.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-chip/Square',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'chip.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'chip.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-chip/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'chip.examples.size.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'chip.examples.size.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-chip/Size',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'chip.examples.icon.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'chip.examples.icon.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-chip/Icon',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'chip.examples.closeable.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'chip.examples.closeable.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-chip/Closeable',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'chip.examples.link.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'chip.examples.link.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-chip/Link',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaChip,
    apiOptions,
  },
] as ApiDocsBlock[]
