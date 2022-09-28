import {
  computed,
  reactive,
  toRefs,
  provide,
  nextTick,
  Ref,
  ComputedRef,
  ExtractPropTypes,
  WritableComputedRef,
} from 'vue'

import type { TreeNode, TreeViewPropKey, TreeViewFilterMethod, TreeViewEmitsList } from '../types'
import { useTreeHelpers, useTreeViewProps } from './useTreeHelpers'
import { TreeViewKey } from '../types'
import { useColors, useSyncProp } from '../../../composables'

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
    getChecked,
    getTrackBy,
    getDisabled,
    getExpanded,
    iterateNodes,
    getNodeProperty,
  } = useTreeHelpers(props)
  const { nodes, expandAll, filter, filterMethod, textBy } = toRefs(props)
  const [expandedList]: WritableComputedRef<TypeModelValue>[] = useSyncProp(
    'expanded',
    props,
    emit,
    [],
    props.stateful,
  )
  const [checkedList]: WritableComputedRef<TypeModelValue>[] = useSyncProp(
    'checked',
    props,
    emit,
    [],
    props.stateful,
  )

  const updateModel = (model: Ref<TypeModelValue>, values: TypeModelValue, state: boolean) => {
    nextTick(() => {
      if (state) {
        model.value = model.value.concat(values)
          .filter((value, idx, self) => self.indexOf(value) === idx)
      } else {
        model.value = model.value.filter(v => !values.includes(v))
      }
    })
  }

  const updateCheckedList = (values: TypeModelValue, state: boolean) => {
    updateModel(checkedList, values, state)
  }

  const toggleCheckbox = (node: TreeNode, state: boolean | null) => {
    let stateValue = state === null ? true : state

    if (state && node.indeterminate) {
      stateValue = false
    }

    const values = [getValue(node)]

    if (isLeafSelectionComputed.value && node.hasChildren) {
      const toggleChildren = (nodes: TreeNode[]) => {
        nodes.forEach((node: TreeNode) => {
          if (node.disabled) { return }

          if (node.children?.length) { toggleChildren(node.children) }

          values.push(getValue(node))
        })
      }

      toggleChildren(node.children)
    }

    updateCheckedList(values, stateValue)
  }

  const toggleNode = (node: TreeNode): void => {
    if (node.hasChildren) {
      updateModel(expandedList, [getValue(node)], !node.expanded)
    }
  }

  const createNode: CreateNodeFunc = ({ node, level, children = [], computedFilterMethod }) => {
    const valueBy = getValue(node)
    let matchesFilter = true
    const hasChildren = !!children.length
    const disabled = getDisabled(node) || false
    let indeterminate = false
    let checked: boolean | null = checkedList.value.includes(valueBy) || false

    if (isLeafSelectionComputed.value && hasChildren) {
      const isAllChildrenChecked = children.every(c => c.checked)

      checked = isAllChildrenChecked
      indeterminate = !isAllChildrenChecked && children.some(c => c.indeterminate || c.checked)

      if (indeterminate) { checked = null }
    }

    if (filter.value) {
      matchesFilter = children?.some(c => c.matchesFilter) || computedFilterMethod.value?.(node, filter.value, textBy.value)
    }

    return reactive({
      ...node,
      level,
      checked,
      children,
      disabled,
      // @ts-ignore
      expanded: expandedList.value.includes(valueBy) || false,
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
    return nodes.map((node: TreeNode) => {
      if (node.children?.length) {
        const children = buildTree(node.children, level + 1)

        return createNode({ node, level, children, computedFilterMethod })
      }

      return createNode({ node, level, computedFilterMethod })
    })
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

  const checkForInitialValues = () => {
    const expandedValues: TypeModelValue = []
    const checkedValues: TypeModelValue = []

    iterateNodes(nodes.value, (node) => {
      if (expandAll.value) {
        expandedValues.push(getValue(node))
      } else {
        getExpanded(node) && expandedValues.push(getValue(node))
      }

      if (getChecked(node)) {
        checkedValues.push(getValue(node))
      }
    })

    if (expandedValues.length) {
      updateModel(expandedList, expandedValues, true)
    }

    if (checkedValues.length) {
      updateModel(checkedList, checkedValues, true)
    }
  }

  checkForInitialValues()

  return {
    treeItems,
    getText,
    getTrackBy,
    toggleCheckbox,
  }
}

export default useTreeView
