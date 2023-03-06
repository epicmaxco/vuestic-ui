import { PropType, ExtractPropTypes } from 'vue'

import type { TreeNode, TreeViewFilterMethod, TreeViewPropKey } from '../types'

import { getValueByKey } from '../../../utils/value-by-key'

export const useTreeViewProps = {
  nodes: {
    type: Array as PropType<TreeNode[]>,
    default: [],
  },
  stateful: {
    type: Boolean,
    default: true,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  selectionType: {
    type: String,
    default: 'leaf',
    validator: (v: string) => ['leaf', 'independent'].includes(v),
  },
  valueBy: {
    type: [String, Function] as PropType<TreeViewPropKey>,
    default: 'id',
  },
  textBy: {
    type: [String, Function] as PropType<TreeViewPropKey>,
    default: 'label',
  },
  trackBy: {
    type: [String, Function] as PropType<TreeViewPropKey>,
    default: 'id',
  },
  iconBy: {
    type: [String, Function] as PropType<TreeViewPropKey>,
    default: 'icon',
  },
  disabledBy: {
    type: [String, Function] as PropType<TreeViewPropKey>,
    default: 'disabled',
  },
  expandedBy: {
    type: [String, Function] as PropType<TreeViewPropKey>,
    default: 'expanded',
  },
  checkedBy: {
    type: [String, Function] as PropType<TreeViewPropKey>,
    default: 'checked',
  },
  childrenBy: {
    type: [String, Function] as PropType<TreeViewPropKey>,
    default: 'children',
  },
  expandAll: {
    type: Boolean,
    default: false,
  },
  expanded: {
    type: Array as PropType<(string | number | TreeNode)[]>,
    default: [],
  },
  expandNodeBy: {
    type: String as PropType<'leaf' | 'node'>,
    default: 'leaf',
  },
  filter: {
    type: String,
    default: '',
  },
  filterMethod: {
    type: Function as PropType<TreeViewFilterMethod | undefined>,
    default: undefined,
  },
  checked: {
    type: Array as PropType<(string | number | TreeNode)[]>,
    default: [],
  },
  color: {
    type: String,
    default: 'primary',
  },
}

export const useTreeViewEmits = ['update:modelValue', 'update:checked', 'update:expanded', 'update:selected']

export const useTreeHelpers = (props: ExtractPropTypes<typeof useTreeViewProps>) => {
  const isStringOrNumber = (node: TreeNode): node is any => {
    const typeOfNode = typeof node

    return typeOfNode === 'string' || typeOfNode === 'number'
  }

  const getNodeProperty = (node: TreeNode, key: TreeViewPropKey) =>
    !key || isStringOrNumber(node) ? node : getValueByKey(node, key)

  const getValue = (node: TreeNode) => getNodeProperty(node, props.valueBy)

  const getNodeByValue = (value: TreeNode) => {
    if (!props.valueBy) { return value }

    return props.nodes.find((node: TreeNode) => value === getValue(node)) || value
  }

  const getText = (node: TreeNode) => getNodeProperty(node, props.textBy)
  const getChecked = (node: TreeNode) => getNodeProperty(node, props.checkedBy)
  const getDisabled = (node: TreeNode) => getNodeProperty(node, props.disabledBy)
  const getExpanded = (node: TreeNode) => getNodeProperty(node, props.expandedBy)
  const getTrackBy = (node: TreeNode) => getNodeProperty(node, props.trackBy)
  const getChildren = (node: TreeNode) => getNodeProperty(node, props.childrenBy) ?? []

  const iterateNodes = (nodes: TreeNode[], cb: (node: TreeNode) => unknown) => {
    nodes.forEach((node: TreeNode) => {
      const children = node.children || []

      if (children.length) { iterateNodes(children, cb) }

      cb(node)
    })
  }

  return {
    getText,
    getValue,
    getChecked,
    getTrackBy,
    getChildren,
    getDisabled,
    getExpanded,
    iterateNodes,
    getNodeByValue,
    getNodeProperty,
  }
}
