import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaCarousel from 'vuestic-ui/src/components/va-carousel/VaCarousel.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-carousel/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('carousel.title'),

  block.subtitle('all.examples'),

  // examples
  ...block.exampleBlock(
    'carousel.examples.Default.title',
    'carousel.examples.Default.text',
    'Default',
  ),

  ...block.exampleBlock(
    'carousel.examples.Arrows.title',
    'carousel.examples.Arrows.text',
    'Arrows',
  ),

  ...block.exampleBlock(
    'carousel.examples.Indicators.title',
    'carousel.examples.Indicators.text',
    'Indicators',
  ),

  ...block.exampleBlock(
    'carousel.examples.Vertical.title',
    'carousel.examples.Vertical.text',
    'Vertical',
  ),

  ...block.exampleBlock(
    'carousel.examples.Slots.title',
    'carousel.examples.Slots.text',
    'Slots',
  ),

  ...block.exampleBlock(
    'carousel.examples.Infinite.title',
    'carousel.examples.Infinite.text',
    'Infinite',
  ),

  ...block.exampleBlock(
    'carousel.examples.Autoscroll.title',
    'carousel.examples.Autoscroll.text',
    'Autoscroll',
  ),

  ...block.exampleBlock(
    'carousel.examples.Fade.title',
    'carousel.examples.Fade.text',
    'Fade',
  ),

  block.api(VaCarousel, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
