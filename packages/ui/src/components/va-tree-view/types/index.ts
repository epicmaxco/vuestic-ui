import { ComponentPublicInstance } from 'vue'
import VaTreeNode from '../VaTreeNode/VaTreeNode.vue'

export const TreeViewKey = Symbol('TreeView')
export const TreeCategoryKey = Symbol('TreeCategory')
export const TreeNodeKey = Symbol('TreeNode')

export interface TreeNodeCommon<T> {
  onChildMounted: (value: T) => void,
  onChildUnmounted: (value: T) => void,
}

export interface TreeCategoryProps {
  label: string | number,
  isOpen: boolean,
  icon: string,
  color: string,
}

export interface TreeViewMethods<T> {
  onChildMounted: (value: T) => void,
  onChildUnmounted: (value: T) => void,
}

export interface TreeCategory {
  treeView: TreeViewMethods<TreeCategory>,
  nodes: ComponentPublicInstance<TreeCategory | typeof VaTreeNode>[],
  isOpenCached: boolean | undefined,
  collapse: () => void,
  expand: () => void,
  toggle: (e: MouseEvent) => void,
  onChildMounted: (node: ComponentPublicInstance<TreeCategory | typeof VaTreeNode>) => void,
  onChildUnmounted: (removableNode: ComponentPublicInstance<TreeCategory | typeof VaTreeNode>) => void,
}

export type TreeNodeComponent = ComponentPublicInstance<TreeCategory | typeof VaTreeNode>

export interface ITreeNodeProps {
  highlighted: boolean,
  icon: string,
  iconRight: string,
  color: string,
}

export interface TreeViewProps {
  color: string
}

export interface TreeView {
  collapse: () => void,
  expand: () => void,
}

export interface TreeViewProvide extends TreeViewProps {
  onChildMounted: (category: TreeCategory) => void
  onChildUnmounted: (removableCategory: TreeCategory) => void
}
