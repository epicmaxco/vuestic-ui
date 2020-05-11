import { BlockType } from '../../../types/configTypes'
import Api from '../../../examples/va-slider/Api.vue'
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
    translationString: 'slider.advanced.state.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.state.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/State',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.loading.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.loading.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-switch/Loading',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.error.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.error.paragraph',
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
    component: Api,
  },
]
