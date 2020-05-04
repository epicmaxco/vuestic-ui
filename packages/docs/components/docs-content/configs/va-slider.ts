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
import Api from '../demo-components/slider/Api.vue'

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
    type: BlockType.COMPONENT,
    component: Color,
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
    type: BlockType.COMPONENT,
    component: MinMax,
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
    type: BlockType.COMPONENT,
    component: State,
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
    type: BlockType.COMPONENT,
    component: Range,
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
    type: BlockType.COMPONENT,
    component: Step,
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
    type: BlockType.COMPONENT,
    component: Pins,
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
    type: BlockType.COMPONENT,
    component: Label,
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
    type: BlockType.COMPONENT,
    component: Slots,
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
    type: BlockType.COMPONENT,
    component: Icon,
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
    type: BlockType.COMPONENT,
    component: Track,
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
    type: BlockType.COMPONENT,
    component: TrackLabel,
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
    type: BlockType.COMPONENT,
    component: Vertical,
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
    type: BlockType.COMPONENT,
    component: Api,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'slider.faq.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'slider.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'slider.faq.questions[0].answer',
  },
]
