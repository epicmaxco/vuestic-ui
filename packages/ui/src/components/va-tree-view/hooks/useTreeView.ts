import {
  computed,
  reactive,
  toRefs,
  ref,
  provide,
  watch,
  ComputedRef,
  ExtractPropTypes,
} from 'vue'

import type { TreeNode, TreeViewPropKey, TreeViewFilterMethod, TreeViewEmitsList } from '../types'
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

type TreeViewEmitsFunc = (event: TreeViewEmitsList, newValues: unknown) => void

type UseTreeViewFunc = (props: ExtractPropTypes<typeof useTreeViewProps>, emit: TreeViewEmitsFunc) => {
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

const useTreeView: UseTreeViewFunc = (props, emit) => {
  const { getColor } = useColors()
  const colorComputed = computed(() => getColor(props.color))
  const isLeafSelectionComputed = computed(() => props.selectionType === 'leaf')
  const {
    getText,
    getTrackBy,
    iterateNodes,
    getNodeProperty,
  } = useTreeHelpers(props)
  const { nodes, expandAll, filter, filterMethod, textBy, checked, stateful } = toRefs(props)
  const checkedList = ref(checked.value.length ? checked.value : [])

  watch(() => checkedList.value, (newValue) => {
    if (stateful.value) {
      emit('update:checked', newValue)
    }
  })

  const updateCheckedList = (values: (string | number | TreeNode)[], state: boolean) => {
    if (state) {
      checkedList.value = checkedList.value.concat(values)
        .filter((value, idx, self) => self.indexOf(value) === idx)
    } else {
      checkedList.value = checkedList.value.filter(v => !values.includes(v))
    }
  }

  const toggleCheckbox = (node: TreeNode, state: boolean) => {
    const stateValue = state === null ? true : state
    const trackByValue = getTrackBy(node)

    if (isLeafSelectionComputed.value) {
      if (node.hasChildren) {
        const values = [trackByValue]

        iterateNodes(
          node.children,
          (childNode: TreeNode) => values.push(getTrackBy(childNode)),
        )
        updateCheckedList(values, stateValue)
      }
    }

    updateCheckedList([trackByValue], stateValue)
  }

  const createNode: CreateNodeFunc = ({ node, level, children = [], computedFilterMethod }) => {
    const trackByValue = getTrackBy(node)
    const matchesFilter = filter.value ? computedFilterMethod.value?.(node, filter.value, textBy.value) : true
    const hasChildren = !!children.length
    let indeterminate = false
    let checked: boolean | null = node.checked || checkedList.value.includes(trackByValue) || false

    if (isLeafSelectionComputed.value && hasChildren) {
      const isAllChildrenChecked = children.every(c => c.checked)

      checked = isAllChildrenChecked
      updateCheckedList([trackByValue], isAllChildrenChecked)
      indeterminate = !isAllChildrenChecked && children.some(c => c.indeterminate || c.checked)

      if (indeterminate) { checked = null }
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
