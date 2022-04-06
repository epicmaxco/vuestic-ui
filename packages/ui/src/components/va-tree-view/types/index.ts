import { ComponentPublicInstance } from 'vue'
import VaTreeNode from '../VaTreeNode/VaTreeNode.vue'

export const TreeViewKey = Symbol('TreeView')
export const TreeCategoryKey = Symbol('TreeCategory')
export const TreeNodeKey = Symbol('TreeNode')

export interface ITreeNodeCommon<T> {
  onChildMounted: (value: T) => void,
  onChildUnmounted: (value: T) => void,
}

export interface TreeCategoryProps {
  label: string | number,
  isOpen: boolean,
  icon: string,
  color: string,
}

export interface ITreeView<T> {
  onChildMounted: (value: T) => void,
  onChildUnmounted: (value: T) => void,
}

export interface ITreeCategory {
  treeView: ITreeView<ITreeCategory>,
  nodes: ComponentPublicInstance<ITreeCategory | typeof VaTreeNode>[],
  isOpenCached: boolean | undefined,
  collapse: () => void,
  expand: () => void,
  toggle: (e: MouseEvent) => void,
  onChildMounted: (node: ComponentPublicInstance<ITreeCategory | typeof VaTreeNode>) => void,
  onChildUnmounted: (removableNode: ComponentPublicInstance<ITreeCategory | typeof VaTreeNode>) => void,
}

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
  onChildMounted: (category: ITreeCategory) => void
  onChildUnmounted: (removableCategory: ITreeCategory) => void
}
