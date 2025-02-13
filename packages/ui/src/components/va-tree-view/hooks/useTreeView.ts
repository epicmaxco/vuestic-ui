import {
  ref,
  toRefs,
  provide,
  computed,
  ComputedRef,
  ExtractPropTypes,
  WritableComputedRef,
} from 'vue'

import { useColors, useStateful } from '../../../composables'

import type { TreeNode, TreeViewFilterMethod, TreeViewEmitsFunc } from '../types'
import { useTreeHelpers, useTreeViewProps } from './useTreeHelpers'
import { TreeViewKey } from '../types'
import useTreeKeyboardNavigation from './useTreeKeyboardNavigation'

type CreateNodeProps = {
  node: TreeNode
  level: number
  children?: TreeNode[]
  computedFilterMethod: ComputedRef<TreeViewFilterMethod>
}

type CreateNodeFunc = (props: CreateNodeProps) => TreeNode
type TreeBuilderFunc = (nodes: TreeNode[], level?: number) => TreeNode[]
type TypeModelValue = (string | number | TreeNode)[]

type UseTreeViewFunc = (props: ExtractPropTypes<typeof useTreeViewProps>, emit: TreeViewEmitsFunc) => {
  treeItems: ComputedRef<TreeNode[]>
  getText: (node: TreeNode) => string | number
  getTrackBy: (node: TreeNode) => string | number
  toggleCheckbox: (node: TreeNode, state: boolean) => void
}

const useTreeView: UseTreeViewFunc = (props, emit) => {
  const { getColor } = useColors()
  const colorComputed = computed(() => getColor(props.color))
  const isLeafSelectionComputed = computed(() => props.selectionType === 'leaf')
  const {
    getText,
    getValue,
    getChecked,
    getTrackBy,
    getChildren,
    getDisabled,
    getExpanded,
    iterateNodes,
    getNodeProperty,
  } = useTreeHelpers(props)
  const { nodes, expandAll, filter, filterMethod, textBy } = toRefs(props)
  const expandedList = useStateful(props, emit, 'expanded')
  const checkedList = useStateful(props, emit, 'checked')

  const selectedNode = ref()
  const selectedNodeComputed: WritableComputedRef<string | number | Record<string, unknown>> = computed({
    get: () => selectedNode.value,
    set: (node: TreeNode) => {
      const value = getValue(node)

      if (selectedNode.value !== value) {
        selectedNode.value = value
        emit('update:selected', node)
      }
    },
  })

  const updateModel = (model: WritableComputedRef<TypeModelValue>, values: TypeModelValue, state: boolean) => {
    if (state) {
      model.value = model.value.concat(values)
        .filter((value, idx, self) => self.indexOf(value) === idx)
    } else {
      model.value = model.value.filter(v => !values.includes(v))
    }
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

          const children = getChildren(node)

          if (children.length) { toggleChildren(children) }

          values.push(getValue(node))
        })
      }

      toggleChildren(getChildren(node))
    }

    updateModel(checkedList, values, stateValue)
  }

  const toggleNode = (node: TreeNode): void => {
    node.expanded = !node.expanded
  }

  const createNode: CreateNodeFunc = ({ node, level, children = [], computedFilterMethod }) => {
    const valueBy = getValue(node)
    let matchesFilter = true
    const hasChildren = !!children.length
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

    return {
      ...node,
      level,
      checked,
      children,
      get disabled () {
        return getDisabled(node) || false
      },
      get expanded () {
        const expandKey = (props.expandedBy as string)

        return expandKey in node ? node[expandKey] : expandedList.value.includes(valueBy) || false
      },
      set expanded (value: boolean) {
        const expandKey = (props.expandedBy as string)
        node[expandKey] = value
        if (hasChildren) {
          updateModel(expandedList, [getValue(node)], value)
        }
      },
      hasChildren,
      matchesFilter,
      indeterminate,
    }
  }

  const computedFilterMethod = computed<TreeViewFilterMethod>(() => {
    if (filterMethod?.value) { return filterMethod.value }

    return (node, filter) => getText(node).toLowerCase().includes(filter.toLowerCase())
  })

  const buildTree: TreeBuilderFunc = (nodes: TreeNode[], level = 0) => nodes.map((node: TreeNode) => {
    const treeItemChildren = getChildren(node)

    if (treeItemChildren.length) {
      const children = buildTree(treeItemChildren, level + 1)

      return createNode({ node, level, children, computedFilterMethod })
    }

    return createNode({ node, level, computedFilterMethod })
  })

  const getFilteredNodes = (nodes: TreeNode[]): TreeNode[] => nodes.filter((node) => {
    if (node.children) { node.children = getFilteredNodes(node.children) }

    if (node.children.length === 0) { node.hasChildren = false }

    return node.matchesFilter
  })

  const { handleKeyboardNavigation } = useTreeKeyboardNavigation(props, { emit, toggleCheckbox, toggleNode })

  provide(TreeViewKey, {
    selectedNodeComputed,
    colorComputed,
    iconBy: props.iconBy,
    selectable: props.selectable,
    expandNodeBy: props.expandNodeBy,
    getText,
    getValue,
    getTrackBy,
    toggleNode,
    toggleCheckbox,
    getNodeProperty,
    handleKeyboardNavigation,
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
    treeItems: computed(() => getFilteredNodes(treeItems.value)),
    getText,
    getTrackBy,
    toggleCheckbox,
  }
}

export default useTreeView
