import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('advancedIconsConfig.title'),
  block.paragraph('advancedIconsConfig.subtitle'),

  // TODO: Draw image example how works searching in flat array.

  // TODO: How to use Component and pass props to define own data-attrs or smth else
]

export default config
