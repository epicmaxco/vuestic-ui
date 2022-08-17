import { ComputedRef, InjectionKey, Ref } from 'vue'

export interface TreeNode {
  id: number | string
  children: TreeNode[]
  level?: number
  checked?: boolean | null
  disabled?: boolean
  expanded?: boolean
  hasChildren?: boolean
  matchesFilter?: boolean
  indeterminate?: boolean
  [key: string]: any
}

export type TreeViewPropKey = string | ((node: TreeNode) => string | number)

export type TreeViewFilterMethod = (node: TreeNode, filter: string, textBy: TreeViewPropKey) => boolean

export interface TreeView {
  selectable: boolean
  iconBy: TreeViewPropKey
  colorComputed: ComputedRef<string>
  getText: (node: TreeNode) => string
  toggleNode: (node: TreeNode) => void
  getTrackBy: (node: TreeNode) => string
  getNodeProperty: (node: TreeNode, key: TreeViewPropKey) => unknown
  toggleCheckbox: (node: TreeNode, state: boolean) => void
}

export const TreeViewKey = Symbol('TreeView') as InjectionKey<TreeView>
