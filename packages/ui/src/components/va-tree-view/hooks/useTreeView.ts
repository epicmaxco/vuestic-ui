import { computed, reactive, toRefs, ComputedRef, ExtractPropTypes, ref, provide } from 'vue'

import type { TreeNode, TreeViewPropKey, TreeViewFilterMethod } from '../types'
import { useTreeHelpers, useTreeViewProps } from './useTreeHelpers'
import { TreeViewKey } from '../types'
import { useColors } from '../../../composables'

type CreateNodeProps = {
  node: TreeNode
  level: number
  children?: TreeNode[]
  computedFilterMethod: ComputedRef<TreeViewFilterMethod>
}

type CreateNodeFunc = (props: CreateNodeProps) => TreeNode

type UseTreeViewFunc = (props: ExtractPropTypes<typeof useTreeViewProps>) => {
  treeItems: ComputedRef<TreeNode[]>
  getValue?: (node: TreeNode) => TreeNode
  getNodeByValue?: (node: TreeNode) => TreeNode
  getText?: (node: TreeNode) => string | number
  getDisabled?: (node: TreeNode) => boolean
  getTrackBy?: (node: TreeNode) => TreeNode | string | number
  getNodeProperty?: (node: TreeNode, key: TreeViewPropKey) => unknown
  toggleCheckbox?: (node: TreeNode, state: boolean) => void
}

type TreeBuilderFunc = (nodes: TreeNode[], level?: number) => TreeNode[]

const useTreeView: UseTreeViewFunc = (props) => {
  const { getColor } = useColors()
  const colorComputed = computed(() => getColor(props.color))
  const {
    getText,
    getTrackBy,
    iterateNodes,
    getNodeProperty,
  } = useTreeHelpers(props)
  const { nodes, expandAll, filter, filterMethod, textBy } = toRefs(props)

  const checkedList = ref<(string | number | TreeNode)[]>([])

  const updateCheckedList = (values: (string|number|TreeNode)[], state: boolean) => {
    if (state) {
      checkedList.value = checkedList.value.concat(values)
        .filter((value, idx, self) => self.indexOf(value) === idx)
    } else {
      checkedList.value = checkedList.value.filter(v => !values.includes(v))
    }
  }

  const toggleCheckbox = (node: TreeNode, state: boolean) => {
    if (props.selectionType === 'leaf') {
      if (node.children.length) {
        const values = [getTrackBy(node)]
        const cb = (node: TreeNode) => values.push(getTrackBy(node))

        iterateNodes(node.children, cb)
        updateCheckedList(values, state)
      } else {
        updateCheckedList([getTrackBy(node)], state)
      }
    } else {
      updateCheckedList([getTrackBy(node)], state)
    }
  }

  const createNode: CreateNodeFunc = ({ node, level, children = [], computedFilterMethod }) => {
    const matchesFilter = filter.value ? computedFilterMethod.value?.(node, filter.value, textBy.value) : true
    const hasChildren = !!children.length
    let indeterminate = false
    const checked = node.checked || checkedList.value.includes(getTrackBy(node)) || false

    if (hasChildren) {
      indeterminate = children.some(c => c.indeterminate || checkedList.value.includes(getTrackBy(c)) || false)
    }

    return reactive({
      ...node,
      level,
      checked,
      children,
      hasChildren,
      matchesFilter,
      indeterminate,
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

  const toggleNode = (node: TreeNode): void => {
    if (node.hasChildren && !node.disabled) {
      node.expanded = !node.expanded
    }
  }

  provide(TreeViewKey, {
    colorComputed,
    selectable: props.selectable,
    iconBy: props.iconBy,
    getText,
    getTrackBy,
    toggleNode,
    getNodeProperty,
    toggleCheckbox,
  })

  return {
    treeItems: computed(() => {
      return buildTree(nodes.value)
    }),
    getText,
    getTrackBy,
    toggleCheckbox,
  }
}

export default useTreeView
