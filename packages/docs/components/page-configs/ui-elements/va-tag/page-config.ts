import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaTag from 'vuestic-ui/src/components/vuestic-components/va-tag/VaTag.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'tag.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tag.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tag.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tag.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tag/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tag.examples.outline.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tag.examples.outline.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tag/Outline',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tag.examples.flat.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tag.examples.flat.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tag/Flat',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tag.examples.square.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tag.examples.square.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tag/Square',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tag.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tag.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tag/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tag.examples.size.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tag.examples.size.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tag/Size',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tag.examples.icon.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tag.examples.icon.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tag/Icon',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tag.examples.closeable.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tag.examples.closeable.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tag/Closeable',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tag.examples.link.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tag.examples.link.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tag/Link',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaTag,
    apiOptions,
  },
] as ApiDocsBlock[]
