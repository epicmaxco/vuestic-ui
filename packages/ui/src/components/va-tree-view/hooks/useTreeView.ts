import { provide, nextTick, ref } from 'vue'
import { ITreeCategory } from './useTreeCategory'
import { TreeViewKey } from '../types'

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

export const useTreeView = (props: TreeViewProps): TreeView => {
  const categories = ref<ITreeCategory[]>([])

  const collapse = () => {
    nextTick(() => {
      categories.value.forEach((child: ITreeCategory) => {
        child.collapse()
      })
    })
  }

  const expand = () => {
    nextTick(() => {
      categories.value.forEach((child: ITreeCategory) => {
        child.expand()
      })
    })
  }

  const onChildMounted = (category: ITreeCategory) => {
    categories.value.push(category)
  }

  const onChildUnmounted = (removableCategory: ITreeCategory) => {
    categories.value = categories.value.filter((category: ITreeCategory) => category !== removableCategory)
  }

  const treeView: TreeViewProvide = {
    color: props.color,
    onChildMounted,
    onChildUnmounted,
  }

  provide(TreeViewKey, treeView)

  return {
    collapse,
    expand,
  }
}
