import { defineManualApi } from '@/components/DocsApi/ManualApiOptions'

export const VaTreeNodeItemOptions = defineManualApi({
  props: {
    node: { types: 'VaTreeNode' },
  },
  slots: {
    icon: { },
    content: { },
    checkbox: { },
    'not-found': { },
    'icon-toggle': { },
  },
})

export const VaTreeViewOptions = defineManualApi({
  props: {
    modelValue: { types: '(number | string)[]' },
    nodes: { types: 'TreeNode[]' },
    keyBy: { types: 'string' },
    expandAll: { types: 'boolean' },
    selectable: { types: 'boolean' },
    selectionType: { types: "'leaf' | 'independent'" },
    filter: { types: 'string' },
    filterMethod: { types: 'function' },
  },
})
