import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaAvatar
  from 'vuestic-ui-dev/src/components/vuestic-components/va-avatar/VaAvatar.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'avatar.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'avatar.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'avatar.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'avatar.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-avatar/Default',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'avatar.examples.color.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-avatar/Color',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'avatar.examples.size.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'avatar.examples.size.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-avatar/Size',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'avatar.examples.withImage.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'avatar.examples.withImage.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-avatar/WithImage',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'avatar.examples.withIcon.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'avatar.examples.withIcon.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-avatar/WithIcon',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'avatar.examples.withEmail.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'avatar.examples.withEmail.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-avatar/WithEmail',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    apiOptions,
    type: BlockType.API,
    componentOptions: VaAvatar,
  },
] as ApiDocsBlock[]
