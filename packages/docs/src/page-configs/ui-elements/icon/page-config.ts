import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaIcon from 'vuestic-ui/src/components/va-icon/VaIcon.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('icon.title'),
  block.paragraph('icon.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'icon.examples.default.title',
    'icon.examples.default.text',
    'Default',
    {
      codesandboxConfig: {
        requireIcons: true,
      },
    },
  ),
  ...block.exampleBlock(
    'icon.examples.color.title',
    'icon.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'icon.examples.size.title',
    'icon.examples.size.text',
    'Size',
  ),
  ...block.exampleBlock(
    'icon.examples.rotation.title',
    'icon.examples.rotation.text',
    'Rotation',
  ),
  ...block.exampleBlock(
    'icon.examples.spin.title',
    'icon.examples.spin.text',
    'Spin',
  ),
  ...block.exampleBlock(
    'icon.examples.text.title',
    'icon.examples.text.text',
    'Text',
  ),
  ...block.exampleBlock(
    'icon.examples.tag.title',
    'icon.examples.tag.text',
    'Tag',
  ),

  block.subtitle('all.api'),
  block.api(VaIcon, apiOptions),
]

export default config
