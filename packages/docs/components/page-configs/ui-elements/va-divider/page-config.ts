import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import { VueConstructor } from 'vue'
import VaDivider
  from 'vuestic-ui/src/components/vuestic-components/va-divider/VaDivider.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'divider.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'divider.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'divider.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'divider.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-divider/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'divider.examples.customContent.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'divider.examples.customContent.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-divider/CustomContent',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'divider.examples.vertical.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'divider.examples.vertical.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-divider/Vertical',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'divider.examples.inset.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'divider.examples.inset.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-divider/Inset',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'divider.examples.dashed.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'divider.examples.dashed.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-divider/Dashed',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'divider.examples.withList.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'divider.examples.withList.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-divider/WithList',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaDivider as unknown as VueConstructor,
    apiOptions,
  },
]

export default config
