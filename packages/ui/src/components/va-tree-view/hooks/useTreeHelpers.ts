import { PropType, ExtractPropTypes } from 'vue'

import type { TreeNode, TreeViewFilterMethod, TreeViewPropKey } from '../types'

import { getValueByKey } from '../../../services/utils'

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
    default: '',
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
  expandAll: {
    type: Boolean,
    default: false,
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

export const useTreeViewEmits = ['update:modelValue', 'update:checked']

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
  const getDisabled = (node: TreeNode) => getValueByKey(node, props.disabledBy)
  const getTrackBy = (node: TreeNode) => getNodeProperty(node, props.trackBy) || getText(node)

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
    getTrackBy,
    getDisabled,
    iterateNodes,
    getNodeByValue,
    getNodeProperty,
  }
}
