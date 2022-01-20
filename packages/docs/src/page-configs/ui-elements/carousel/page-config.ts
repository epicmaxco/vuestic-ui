import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaCarousel from 'vuestic-ui/src/components/va-carousel/VaCarousel.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('carousel.title'),

  block.subtitle('all.examples'),

  // examples
  // ...block.exampleBlock(
  //   'carousel.examples.yourExample.title',
  //   'carousel.examples.yourExample.text',
  //   'Example',
  // ),

  block.api(VaCarousel, apiOptions),
]

export default config
