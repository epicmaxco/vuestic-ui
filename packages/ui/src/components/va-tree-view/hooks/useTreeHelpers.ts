import { PropType, ExtractPropTypes } from 'vue'

import type {TreeNode, TreeViewFilterMethod, TreeViewSelectableProp} from '../types'

import { getValueByKey } from '../../../services/utils'

export const useTreeViewProps = {
  nodes: {
    type: Array as PropType<TreeNode[]>,
    default: [],
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
    type: [String, Function] as PropType<TreeViewSelectableProp>,
    default: '',
  },
  textBy: {
    type: [String, Function] as PropType<TreeViewSelectableProp>,
    default: 'label',
  },
  trackBy: {
    type: [String, Function] as PropType<TreeViewSelectableProp>,
    default: 'id',
  },
  disabledBy: {
    type: [String, Function] as PropType<TreeViewSelectableProp>,
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
}

export const useTreeHelpers = (props: ExtractPropTypes<typeof useTreeViewProps>) => {
  const isStringOrNumber = (node: TreeNode): node is any => {
    const typeOfNode = typeof node

    return typeOfNode === 'string' || typeOfNode === 'number'
  }

  const getNodeProperty = (node: TreeNode, selector: TreeViewSelectableProp) =>
    !selector || isStringOrNumber(node) ? node : getValueByKey(node, selector)

  const getValue = (node: TreeNode) => getNodeProperty(node, props.valueBy)

  const getNodeByValue = (value: TreeNode) => {
    if (!props.valueBy) { return value }

    return props.nodes.find((node: TreeNode) => value === getValue(node)) || value
  }

  const getText = (node: TreeNode) => getNodeProperty(node, props.textBy)
  const getDisabled = (node: TreeNode) => getValueByKey(node, props.disabledBy)
  const getTrackBy = (node: TreeNode) => getNodeProperty(node, props.trackBy)

  return {
    getValue,
    getNodeByValue,
    getText,
    getDisabled,
    getTrackBy,
  }
}
