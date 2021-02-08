import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaIcon from 'vuestic-ui-dev/src/components/vuestic-components/va-icon/VaIcon.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'icon.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'icon.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'icon.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'icon.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-icon/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'icon.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'icon.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-icon/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'icon.examples.size.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'icon.examples.size.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-icon/Size',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'icon.examples.rotation.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'icon.examples.rotation.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-icon/Rotation',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'icon.examples.spin.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'icon.examples.spin.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-icon/Spin',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'icon.examples.text.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'icon.examples.text.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-icon/Text',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'icon.examples.tag.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'icon.examples.tag.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-icon/Tag',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaIcon,
    apiOptions,
  },
] as ApiDocsBlock[]
