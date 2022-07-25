import { ComputedRef, InjectionKey, Ref } from 'vue'

export interface TreeNode {
  id: number | string
  children: TreeNode[]
  level?: number
  checked?: boolean
  disabled?: boolean
  expanded?: boolean
  hasChildren?: boolean
  matchesFilter?: boolean
  [key: string]: any
}

export interface TreeView {
  nodeKey: string | number
  labelKey: string
  selectable: boolean
  iconColor: ComputedRef<string>
  colorComputed: ComputedRef<string>
  toggleNode: (node: TreeNode) => void
  toggleCheckbox: (node: TreeNode, isSelected: boolean) => void
  getKey: (node:TreeNode) => string,
}

export const TreeViewKey = Symbol('TreeView') as InjectionKey<TreeView>

export type CreateNodeProps = {
  node: TreeNode
  level?: number
  children?: TreeNode[]
  filter?: Ref<string>
  labelKey?: Ref<string>
  expandAll?: Ref<boolean>
}

export type CreateNodeFunc = (props: CreateNodeProps) => TreeNode

export type UseTreeBuilderProps = {
  filter: Ref<string>
  labelKey: Ref<string>
  nodes: Ref<TreeNode[]>
  expandAll: Ref<boolean>
  [key: string]: any
}

export type UseTreeBuilderFunc = (props: UseTreeBuilderProps) => {
  treeItems: ComputedRef<TreeNode[]>
}

export type TreeBuilderFunc = (nodes: TreeNode[], level?: number) => TreeNode[]
