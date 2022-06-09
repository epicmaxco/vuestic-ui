import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('treeView.title'),
  block.paragraph('treeView.description'),

  // Default
  block.subtitle('treeView.examples.default.title'),
  block.example('Default'),

  // Customizable content
  block.subtitle('treeView.examples.customizableContent.title'),
  block.paragraph('treeView.examples.customizableContent.description'),
  block.example('CustomizableContent'),

  // Filters
  block.subtitle('treeView.examples.filters.title'),
]

export default config
