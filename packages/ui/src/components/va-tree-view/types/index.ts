export const TreeViewKey = Symbol('TreeView')

export interface TreeNode {
  id: number | string
  children: TreeNode[]
  expanded: boolean
  selected: boolean
  [key: string]: unknown
}

export interface TreeViewProvide {
  nodeKey: string
  selectable: boolean
  toggleNode: (node: TreeNode) => void
  toggleSelect: (isSelected: boolean, node: TreeNode) => void
}
