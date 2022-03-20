export const TreeViewKey = Symbol('TreeView')
export const TreeCategoryKey = Symbol('TreeCategory')
export const TreeNodeKey = Symbol('TreeNode')

export interface ITreeNodeCommon<T> {
  onChildMounted: (value: T) => void,
  onChildUnmounted: (value: T) => void,
}
