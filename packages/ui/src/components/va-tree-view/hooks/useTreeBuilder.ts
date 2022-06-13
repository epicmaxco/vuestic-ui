import { TreeBuilderFunc, CreateNodeFunc, UseTreeBuilderFunc } from '../types'
import { reactive } from 'vue'

export const createNode: CreateNodeFunc = ({
  node,
  children = [],
  expandAll = false,
  level = 0,
}) => ({
  ...node,
  children,
  level,
  hasChildren: !!children.length,
  expanded: expandAll || node.expanded || false,
  checked: node.checked || false,
  disabled: node.disabled || false,
})

const useTreeBuilder: UseTreeBuilderFunc = ({ nodes, expandAll }) => {
  const buildTree: TreeBuilderFunc = (nodes, level = 0) => {
    return nodes.map((node) => {
      if (node.children?.length) {
        const children = buildTree(node.children, level + 1)

        return createNode({
          node,
          children,
          expandAll: expandAll,
          level,
        })
      }

      return createNode({ node, expandAll, level })
    })
  }

  const treeItems = reactive(buildTree(nodes))

  return { treeItems }
}

export default useTreeBuilder
