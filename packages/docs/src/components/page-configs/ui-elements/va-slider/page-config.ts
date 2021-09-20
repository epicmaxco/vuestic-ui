import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaSlider from 'vuestic-ui/src/components/va-slider/VaSlider.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('slider.title'),
  DocsHelper.paragraph('slider.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'slider.examples.default.title',
    'slider.examples.default.text',
    'va-slider/Default',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.color.title',
    'slider.examples.color.text',
    'va-slider/Color',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.minmax.title',
    'slider.examples.minmax.text',
    'va-slider/MinMax',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.state.title',
    'slider.examples.state.text',
    'va-slider/State',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.range.title',
    'slider.examples.range.text',
    'va-slider/Range',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.step.title',
    'slider.examples.step.text',
    'va-slider/Step',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.pins.title',
    'slider.examples.pins.text',
    'va-slider/Pins',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.label.title',
    'slider.examples.label.text',
    'va-slider/Label',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.slots.title',
    'slider.examples.slots.text',
    'va-slider/Slots',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.icon.title',
    'slider.examples.icon.text',
    'va-slider/Icon',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.track.title',
    'slider.examples.track.text',
    'va-slider/Track',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.trackLabel.title',
    'slider.examples.trackLabel.text',
    'va-slider/TrackLabel',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.vertical.title',
    'slider.examples.vertical.text',
    'va-slider/Vertical',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaSlider, apiOptions),
]

export default config
