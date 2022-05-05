import { ComputedRef } from 'vue'

export const TreeViewKey = Symbol('TreeView')

export interface TreeNode {
  id: number | string
  children: TreeNode[]
  hasChildren?: boolean
  expanded?: boolean
  selected?: boolean
  [key: string]: any
}

export interface TreeViewProvide {
  nodeKey: string
  selectable: boolean
  iconColor: ComputedRef<string>
  colorComputed: ComputedRef<string>
  toggleNode: (node: TreeNode) => void
  toggleSelect: (node: TreeNode, isSelected: boolean) => void
  treeItems: TreeNode[]
}

export type CreateNodeProps = {
  node: TreeNode
  children?: TreeNode[]
  parent?: number | string | null
  expandAll?: boolean
}

export type CreateNodeFunc = (props: CreateNodeProps) => TreeNode

export type UseTreeBuilderProps = {
  expandAll: boolean
  nodes: TreeNode[]
}

export type UseTreeBuilderFunc = (props: UseTreeBuilderProps) => {
  treeItems: TreeNode[]
}

export type TreeBuilderFunc = (
  nodes: TreeNode[],
) => TreeNode[]
