import { ComputedRef, InjectionKey } from 'vue'

export interface TreeNode {
  id: number | string
  children: TreeNode[]
  level?: number
  checked?: boolean
  disabled?: boolean
  expanded?: boolean
  hasChildren?: boolean
  matchesFilter?: boolean
  indeterminate?: boolean
  [key: string]: any
}

export interface TreeView {
  keyBy: string | number
  textBy: string
  selectable: boolean
  iconColor: ComputedRef<string>
  colorComputed: ComputedRef<string>
  toggleNode: (node: TreeNode) => void
  toggleCheckbox: (node: TreeNode, isSelected: boolean) => void
  getKey: (node:TreeNode) => string,
}

export const TreeViewKey = Symbol('TreeView') as InjectionKey<TreeView>
