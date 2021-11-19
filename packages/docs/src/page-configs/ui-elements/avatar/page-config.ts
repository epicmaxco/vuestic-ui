import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaAvatar from 'vuestic-ui/src/components/va-avatar/VaAvatar.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('avatar.title'),
  block.paragraph('avatar.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'avatar.examples.default.title',
    'avatar.examples.default.text',
    'Default',
  ),
  block.headline('avatar.examples.color.title'),
  block.example('Color'),
  ...block.exampleBlock(
    'avatar.examples.size.title',
    'avatar.examples.size.text',
    'Size',
  ),
  ...block.exampleBlock(
    'avatar.examples.withImage.title',
    'avatar.examples.withImage.text',
    'WithImage',
  ),
  ...block.exampleBlock(
    'avatar.examples.withIcon.title',
    'avatar.examples.withIcon.text',
    'WithIcon',
  ),

  block.subtitle('all.api'),
  block.api(VaAvatar, apiOptions),
]

export default config
