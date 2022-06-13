import { defineManualApi } from '@/components/DocsApi/ManualApiOptions'

export default defineManualApi({
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
