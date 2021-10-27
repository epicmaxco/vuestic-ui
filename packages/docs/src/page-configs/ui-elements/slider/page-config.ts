import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaSlider from 'vuestic-ui/src/components/va-slider/VaSlider.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/slider'

const config: ApiDocsBlock[] = [
  DocsHelper.title('slider.title'),
  DocsHelper.paragraph('slider.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'slider.examples.default.title',
    'slider.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.color.title',
    'slider.examples.color.text',
    configPath,
    'Color',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.minmax.title',
    'slider.examples.minmax.text',
    configPath,
    'MinMax',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.state.title',
    'slider.examples.state.text',
    configPath,
    'State',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.range.title',
    'slider.examples.range.text',
    configPath,
    'Range',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.step.title',
    'slider.examples.step.text',
    configPath,
    'Step',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.pins.title',
    'slider.examples.pins.text',
    configPath,
    'Pins',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.label.title',
    'slider.examples.label.text',
    configPath,
    'Label',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.slots.title',
    'slider.examples.slots.text',
    configPath,
    'Slots',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.icon.title',
    'slider.examples.icon.text',
    configPath,
    'Icon',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.track.title',
    'slider.examples.track.text',
    configPath,
    'Track',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.trackLabel.title',
    'slider.examples.trackLabel.text',
    configPath,
    'TrackLabel',
  ),
  ...DocsHelper.exampleBlock(
    'slider.examples.vertical.title',
    'slider.examples.vertical.text',
    configPath,
    'Vertical',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaSlider, apiOptions),
]

export default config
