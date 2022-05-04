import {
  TreeBuilderFunc,
  CreateNodeFunc, TreeNode,
  UseTreeBuilderFunc,
} from '../types'
import { reactive } from 'vue'

export const createNode: CreateNodeFunc = ({
  node,
  children = [],
  parent = null,
  expandAll = false,
}) => ({
  ...node,
  parent,
  children,
  hasChildren: !!children.length,
  expanded: expandAll,
  selected: false,
  disabled: false,
})

const useTreeBuilder: UseTreeBuilderFunc = ({ nodes, expandAll }) => {
  const buildTree: TreeBuilderFunc = (nodes) => {
    return nodes.map((node) => {
      if (node.children?.length) {
        const children = buildTree(node.children)

        return createNode({
          node,
          children,
          expandAll: expandAll,
        })
      }

      return createNode({ node, expandAll })
    })
  }

  const treeItems = reactive(buildTree(nodes))

  return { treeItems }
}

export default useTreeBuilder
