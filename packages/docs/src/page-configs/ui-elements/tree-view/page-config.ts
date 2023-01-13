import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { VaTreeViewOptions } from './api-options'
import VaTreeView from 'vuestic-ui/src/components/va-tree-view/VaTreeView.vue'

const treeNodeType = `
interface TreeNode {
  id: number | string
  children: TreeNode[]
  level?: number
  checked?: boolean | null
  disabled?: boolean
  expanded?: boolean
  hasChildren?: boolean
  matchesFilter?: boolean
  indeterminate?: boolean
  [key: string]: any
}
`

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
  block.subtitle('treeView.examples.selectable.coloredTitle'),
  block.example('SelectableColored'),

  // API
  block.subtitle('api'),
  block.api(VaTreeView, VaTreeViewOptions),
  block.collapse('TreeNode type', [block.code(treeNodeType)]),
]

export default config
