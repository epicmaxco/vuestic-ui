import { defineManualApi } from '@/components/DocsApi/ManualApiOptions'

export const VaTreeNodeItemOptions = defineManualApi({
  props: {
    node: { types: 'VaTreeNode' },
  },
  slots: {
    'icon-toggle': { },
    checkbox: { },
    icon: { },
    content: { },
  },
})

export const VaTreeViewOptions = defineManualApi({
  props: {
    modelValue: { types: '(number | string)[]' },
    nodes: { types: 'TreeNode[]' },
    nodeKey: { types: 'string' },
    expandAll: { types: 'boolean' },
    selectable: { types: 'boolean' },
    selectionType: { types: "'leaf' | 'independent'" },
    filter: { types: 'string' },
  },
})
