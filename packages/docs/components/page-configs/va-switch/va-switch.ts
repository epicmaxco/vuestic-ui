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
    translationString: 'switch.examples.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.default.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.default.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.color.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.color.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.label.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.label.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Label',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.customLabel.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.customLabel.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/CustomLabel',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.innerLabel.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.innerLabel.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/InnerLabel',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.size.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.size.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Size',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.state.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.state.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/State',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.loading.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.loading.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Loading',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'switch.examples.error.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'switch.examples.error.paragraph',
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
