import { BlockType } from '../../../types/configTypes'
import VaSwitch
  from 'vuestic-ui/src/components/vuestic-components/va-switch/VaSwitch.vue'
import { vaSwitchOptions } from '../../../examples/va-switch/apiConfig'
export default [
  {
    type: BlockType.TITLE,
    translationString: 'switch.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'switch.basic.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.basic.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Default',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'switch.advanced.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.advanced.color.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.advanced.color.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.advanced.label.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.advanced.label.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Label',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.advanced.customLabel.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.advanced.customLabel.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/CustomLabel',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.advanced.innerLabel.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.advanced.innerLabel.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/InnerLabel',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.advanced.size.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.advanced.size.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Size',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.advanced.state.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.advanced.state.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/State',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.advanced.loading.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.advanced.loading.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Loading',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.advanced.error.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.advanced.error.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Error',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'switch.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.api.paragraph',
  },
  {
    type: BlockType.API,
    componentOptions: VaSwitch,
    apiOptions: vaSwitchOptions,
  },
]
