import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaSlider
  from 'vuestic-ui/src/components/vuestic-components/va-slider/VaSlider.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'slider.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'slider.basic.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.basic.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Default',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'slider.advanced.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.color.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.color.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.minmax.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.minmax.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/MinMax',
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
    component: 'va-slider/State',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.range.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.range.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Range',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.step.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.step.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Step',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.pins.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.pins.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Pins',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.label.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.label.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Label',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.slots.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.slots.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Slots',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.icon.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.icon.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Icon',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.track.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.track.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Track',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.trackLabel.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.trackLabel.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/TrackLabel',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.advanced.vertical.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.advanced.vertical.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Vertical',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'slider.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.api.paragraph',
  },
  {
    type: BlockType.API,
    componentOptions: VaSlider,
    apiOptions,
  },
] as ApiDocsBlock[]
