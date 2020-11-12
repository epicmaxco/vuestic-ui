import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
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
    translationString: 'slider.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.minmax.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.minmax.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/MinMax',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.state.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.state.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/State',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.range.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.range.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Range',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.step.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.step.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Step',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.pins.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.pins.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Pins',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.label.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.label.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Label',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.slots.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.slots.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Slots',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.icon.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.icon.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Icon',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.track.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.track.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Track',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.trackLabel.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.trackLabel.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/TrackLabel',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.examples.vertical.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.examples.vertical.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-slider/Vertical',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaSlider,
    apiOptions,
  },
] as ApiDocsBlock[]
