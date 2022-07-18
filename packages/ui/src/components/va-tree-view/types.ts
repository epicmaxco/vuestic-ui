import { ComputedRef, WritableComputedRef } from 'vue'

export const TreeViewKey = Symbol('TreeView')

export interface TreeNode {
  id: number | string
  children: TreeNode[]
  hasChildren?: boolean
  expanded?: boolean
  checked?: boolean
  disabled?: boolean
  level?: number
  [key: string]: any
}

export interface TreeViewProvide {
  nodeKey: string | number
  labelKey: string
  selectable: boolean
  iconColor: ComputedRef<string>
  colorComputed: ComputedRef<string>
  toggleNode: (node: TreeNode) => void
  treeItems: WritableComputedRef<TreeNode[]>
  toggleCheckbox: (node: TreeNode, isSelected: boolean) => void
}

export type CreateNodeProps = {
  node: TreeNode
  children?: TreeNode[]
  level?: number
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
  level?: number
) => TreeNode[]

export type UseTreeFilterProps = {
  nodes: TreeNode[]
  labelKey: string
  filter: string
}

export type UseTreeFilterFunc = (props: UseTreeFilterProps) => TreeNode[]
