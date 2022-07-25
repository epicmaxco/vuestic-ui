import { TreeNode, CreateNodeFunc, UseTreeBuilderFunc, TreeBuilderFunc } from '../types'
import { computed, reactive, ref } from 'vue'

export const createNode: CreateNodeFunc = ({
  node,
  children = [],
  level = 0,
  filter = ref(''),
  labelKey = ref(''),
  expandAll = ref(false),
}) => (reactive({
  ...node,
  children,
  level,
  hasChildren: !!children.length,
  expanded: expandAll.value || node.expanded || false,
  checked: node.checked || false,
  disabled: node.disabled || false,
  matchesFilter: computed(() => {
    if (!filter.value) { return true }

    return node[labelKey.value].toLowerCase().includes(filter.value)
  }).value,
}))

const useTreeBuilder: UseTreeBuilderFunc = (props) => {
  const { nodes, expandAll, filter, labelKey } = props

  const buildTree: TreeBuilderFunc = (nodes: TreeNode[], level = 0) => {
    return nodes.reduce((acc: TreeNode[], node: TreeNode) => {
      if (node.children?.length) {
        const children = buildTree(node.children, level + 1)
        const treeNode = createNode({
          node,
          level,
          children,
          filter,
          labelKey,
          expandAll,
        })

        if (!treeNode.matchesFilter) {
          treeNode.matchesFilter = treeNode.children.some(n => n.matchesFilter)
        }

        if (treeNode.matchesFilter) { acc.push(treeNode) }

        return acc
      }

      const treeNode = createNode({
        node,
        level,
        filter,
        labelKey,
        expandAll,
      })

      if (treeNode.matchesFilter) { acc.push(treeNode) }

      return acc
    }, [])
  }

  return { treeItems: computed(() => buildTree(nodes.value)) }
}

export default useTreeBuilder
