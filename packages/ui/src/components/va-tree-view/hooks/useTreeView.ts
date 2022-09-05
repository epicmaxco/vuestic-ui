import {
  computed,
  reactive,
  toRefs,
  ref,
  provide,
  watch,
  Ref,
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

type TypeModelValue = (string | number | TreeNode)[]

const useTreeView: UseTreeViewFunc = (props, emit) => {
  const { getColor } = useColors()
  const colorComputed = computed(() => getColor(props.color))
  const isLeafSelectionComputed = computed(() => props.selectionType === 'leaf')
  const {
    getText,
    getValue,
    getTrackBy,
    getDisabled,
    getExpanded,
    iterateNodes,
    getNodeProperty,
  } = useTreeHelpers(props)
  const { nodes, expandAll, expanded, filter, filterMethod, textBy, checked, stateful } = toRefs(props)
  const expandedList = ref<TypeModelValue>(expanded.value)
  const checkedList = ref<TypeModelValue>(checked.value)

  watch(() => checked.value, (newValue) => {
    checkedList.value = newValue
  })

  const updateModel = (model: Ref<TypeModelValue>, values: TypeModelValue, state: boolean) => {
    if (state) {
      model.value = model.value.concat(values)
        .filter((value, idx, self) => self.indexOf(value) === idx)
    } else {
      model.value = model.value.filter(v => !values.includes(v))
    }
  }

  const updateCheckedList = (values: TypeModelValue, state: boolean) => {
    updateModel(checkedList, values, state)

    if (stateful.value) {
      emit('update:checked', checkedList.value)
    }
  }

  const toggleCheckbox = (node: TreeNode, state: boolean) => {
    const stateValue = state === null ? true : state
    const values = [getValue(node)]

    if (isLeafSelectionComputed.value && node.hasChildren) {
      const cb = (childNode: TreeNode) => values.push(getValue(childNode))

      iterateNodes(node.children, cb)
    }

    updateCheckedList(values, stateValue)
  }

  watch(() => expanded.value, (newValue) => {
    expandedList.value = newValue
  })

  const updateExpandedList = (values: TypeModelValue, state: boolean) => {
    updateModel(expandedList, values, state)

    if (stateful.value) {
      emit('update:expanded', expandedList.value)
    }
  }

  const toggleNode = (node: TreeNode): void => {
    if (node.hasChildren && !node.disabled) {
      updateExpandedList([getValue(node)], !node.expanded)
    }
  }

  const createNode: CreateNodeFunc = ({ node, level, children = [], computedFilterMethod }) => {
    const valueBy = getValue(node)
    const matchesFilter = filter.value ? computedFilterMethod.value?.(node, filter.value, textBy.value) : true
    const hasChildren = !!children.length
    const disabled = getDisabled(node) || false
    const expanded = getExpanded(node) || expandedList.value.includes(valueBy) || false
    let indeterminate = false
    let checked: boolean | null = node.checked || checkedList.value.includes(valueBy) || false

    if (isLeafSelectionComputed.value && hasChildren) {
      const isAllChildrenChecked = children.every(c => c.checked)

      checked = isAllChildrenChecked
      indeterminate = !isAllChildrenChecked && children.some(c => c.indeterminate || c.checked)

      if (indeterminate) { checked = null }
    }

    return reactive({
      ...node,
      level,
      checked,
      children,
      disabled,
      expanded,
      hasChildren,
      matchesFilter,
      indeterminate,
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

  const treeItems = computed(() => buildTree(nodes.value))

  if (expandAll.value) {
    const values: TypeModelValue = []

    iterateNodes(treeItems.value, (node) => values.push(getValue(node)))
    updateModel(expandedList, values, true)
  }

  return {
    treeItems,
    getText,
    getTrackBy,
    toggleCheckbox,
  }
}

export default useTreeView
