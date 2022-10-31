import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { VaTreeViewOptions } from './api-options'
import VaTreeView from 'vuestic-ui/src/components/va-tree-view/VaTreeView.vue'

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
  block.example('Filters'),

  // Selectable
  block.subtitle('treeView.examples.selectable.title'),
  block.example('Selectable'),

  // API
  block.subtitle('treeView.api.treeViewTitle'),
  block.api(VaTreeView, VaTreeViewOptions),
]

export default config
