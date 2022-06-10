import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaSlider from 'vuestic-ui/src/components/va-slider/VaSlider.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-slider/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('slider.title'),
  block.paragraph('slider.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'slider.examples.default.title',
    'slider.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'slider.examples.color.title',
    'slider.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'slider.examples.minmax.title',
    'slider.examples.minmax.text',
    'MinMax',
  ),
  ...block.exampleBlock(
    'slider.examples.state.title',
    'slider.examples.state.text',
    'State',
  ),
  ...block.exampleBlock(
    'slider.examples.range.title',
    'slider.examples.range.text',
    'Range',
  ),
  ...block.exampleBlock(
    'slider.examples.step.title',
    'slider.examples.step.text',
    'Step',
  ),
  ...block.exampleBlock(
    'slider.examples.pins.title',
    'slider.examples.pins.text',
    'Pins',
  ),
  ...block.exampleBlock(
    'slider.examples.label.title',
    'slider.examples.label.text',
    'Label',
  ),
  ...block.exampleBlock(
    'slider.examples.slots.title',
    'slider.examples.slots.text',
    'Slots',
  ),
  ...block.exampleBlock(
    'slider.examples.icon.title',
    'slider.examples.icon.text',
    'Icon',
  ),
  ...block.exampleBlock(
    'slider.examples.track.title',
    'slider.examples.track.text',
    'Track',
  ),
  ...block.exampleBlock(
    'slider.examples.trackLabel.title',
    'slider.examples.trackLabel.text',
    'TrackLabel',
  ),
  ...block.exampleBlock(
    'slider.examples.vertical.title',
    'slider.examples.vertical.text',
    'Vertical',
  ),

  block.subtitle('all.api'),
  block.api(VaSlider, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
