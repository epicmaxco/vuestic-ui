import { computed, reactive, toRefs, ComputedRef, ExtractPropTypes } from 'vue'

import type { TreeNode, TreeViewPropKey, TreeViewFilterMethod } from '../types'
import { useTreeHelpers, useTreeViewProps } from './useTreeHelpers'

type CreateNodeProps = {
  node: TreeNode
  level: number
  children?: TreeNode[]
  computedFilterMethod: ComputedRef<TreeViewFilterMethod>
}

type CreateNodeFunc = (props: CreateNodeProps) => TreeNode

type UseTreeBuilderFunc = (props: ExtractPropTypes<typeof useTreeViewProps>) => {
  treeItems: ComputedRef<TreeNode[]>
  getValue: (node: TreeNode) => TreeNode
  getNodeByValue: (node: TreeNode) => TreeNode
  getText: (node: TreeNode) => string | number
  getDisabled: (node: TreeNode) => boolean
  getTrackBy: (node: TreeNode) => TreeNode | string | number
  getNodeProperty: (node: TreeNode, key: TreeViewPropKey) => unknown
}

type TreeBuilderFunc = (nodes: TreeNode[], level?: number) => TreeNode[]

const useTreeView: UseTreeBuilderFunc = (props) => {
  const {
    getText,
    getValue,
    getTrackBy,
    getDisabled,
    getNodeByValue,
    getNodeProperty,
  } = useTreeHelpers(props)
  const { nodes, expandAll, filter, filterMethod, textBy } = toRefs(props)

  const createNode: CreateNodeFunc = (props) => {
    const { node, level, children = [], computedFilterMethod } = props
    const matchesFilter = filter.value ? computedFilterMethod.value?.(node, filter.value, textBy.value) : true

    return reactive({
      ...node,
      level,
      children,
      matchesFilter,
      hasChildren: !!children.length,
      checked: node.checked || false,
      disabled: node.disabled || false,
      expanded: expandAll.value || node.expanded || false,
    })
  }

  const computedFilterMethod = computed<TreeViewFilterMethod>(() => {
    if (filterMethod?.value) { return filterMethod.value }

    return (node, filter) => getText(node).toLowerCase().includes(filter.toLowerCase())
  })

  const buildTree: TreeBuilderFunc = (nodes: TreeNode[], level = 0) => {
    return nodes.reduce((acc: TreeNode[], node: TreeNode) => {
      if (node.children?.length) {
        const children = buildTree(node.children, level + 1)
        const treeNode = createNode({
          node,
          level,
          children,
          computedFilterMethod,
        })

        if (!treeNode.matchesFilter) {
          treeNode.matchesFilter = treeNode.children.some(n => n.matchesFilter)
        }

        if (treeNode.matchesFilter) { acc.push(treeNode) }

        return acc
      }

      const treeNode = createNode({ node, level, computedFilterMethod })

      if (treeNode.matchesFilter) { acc.push(treeNode) }

      return acc
    }, [])
  }

  return {
    treeItems: computed(() => buildTree(nodes.value)),
    getText,
    getValue,
    getTrackBy,
    getDisabled,
    getNodeByValue,
    getNodeProperty,
  }
}

export default useTreeView
