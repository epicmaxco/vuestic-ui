import { BlockType } from '../../../types/configTypes'
import Default from '../demo-components/slider/Default.vue'
import State from '../demo-components/slider/State.vue'
import Range from '../demo-components/slider/Range.vue'
import Pins from '../demo-components/slider/Pins.vue'
import Icon from '../demo-components/slider/Icon.vue'
import Label from '../demo-components/slider/Label.vue'
import Slots from '../demo-components/slider/Slots.vue'
import Step from '../demo-components/slider/Step.vue'
import Track from '../demo-components/slider/Track.vue'
import TrackLabel from '../demo-components/slider/TrackLabel.vue'
import Vertical from '../demo-components/slider/Vertical.vue'
import Color from '../demo-components/slider/Color.vue'
import MinMax from '../demo-components/slider/MinMax.vue'

export default [
  {
    type: BlockType.TITLE,
    text: 'slider.title',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    text: 'slider.basic.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.basic.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: Default,
  },
  {
    type: BlockType.CODE,
    code: `<va-slider
  v-model="value"
/>`,
  },
  {
    type: BlockType.SUBTITLE,
    text: 'slider.advanced.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.advanced.color.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.advanced.color.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: Color,
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.advanced.minmax.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.advanced.minmax.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: MinMax,
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.advanced.state.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.advanced.state.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: State,
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.advanced.range.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.advanced.range.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: Range,
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.advanced.step.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.advanced.step.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: Step,
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.advanced.pins.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.advanced.pins.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: Pins,
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.advanced.label.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.advanced.label.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: Label,
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.advanced.slots.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.advanced.slots.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: Slots,
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.advanced.icon.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.advanced.icon.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: Icon,
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.advanced.track.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.advanced.track.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: Track,
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.advanced.trackLabel.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.advanced.trackLabel.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: TrackLabel,
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.advanced.vertical.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.advanced.vertical.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: Vertical,
  },
  {
    type: BlockType.SUBTITLE,
    text: 'slider.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.api.paragraph',
  },
  // TODO: here comes api component
  {
    type: BlockType.SUBTITLE,
    text: 'slider.faq.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    text: 'slider.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'slider.faq.questions[0].answer',
  },
]
