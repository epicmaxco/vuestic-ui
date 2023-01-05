import { ComputedRef, InjectionKey, WritableComputedRef } from 'vue'
export type TreeViewEmitsFunc = (event: string, newValues: unknown) => void

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
  expandNodeBy: 'leaf' | 'node'
  colorComputed: ComputedRef<string>
  selectedNodeComputed: WritableComputedRef<string | number | Record<string, unknown>>
  getText: (node: TreeNode) => string
  getValue: (node: TreeNode) => string
  toggleNode: (node: TreeNode) => void
  getTrackBy: (node: TreeNode) => string
  getNodeProperty: (node: TreeNode, key: TreeViewPropKey) => any
  toggleCheckbox: (node: TreeNode, state: boolean | null) => void
  handleKeyboardNavigation: (event: KeyboardEvent, node: TreeNode) => void
}

export const TreeViewKey = Symbol('TreeView') as InjectionKey<TreeView>
