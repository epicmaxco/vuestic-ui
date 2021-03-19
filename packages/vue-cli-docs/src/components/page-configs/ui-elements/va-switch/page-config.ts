import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaSwitch
  from 'vuestic-ui-dev/src/components/vuestic-components/va-switch/VaSwitch.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'switch.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.label.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.label.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Label',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.customLabel.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.customLabel.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/CustomLabel',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.innerLabel.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.innerLabel.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/InnerLabel',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.size.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.size.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Size',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.state.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.state.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/State',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.loading.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.loading.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Loading',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.error.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.error.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Error',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaSwitch,
    apiOptions,
  },
] as ApiDocsBlock[]
