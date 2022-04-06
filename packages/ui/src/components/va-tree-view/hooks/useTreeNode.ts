import { onMounted, onBeforeUnmount, computed, inject, provide } from 'vue'
import { ITreeNodeCommon, ITreeNodeProps, TreeCategoryKey, TreeNodeKey } from '../types'

const useTreeNode = (props: ITreeNodeProps) => {
  const treeCategory: ITreeNodeCommon<typeof TreeNodeKey> = inject(TreeCategoryKey, {
    onChildMounted: (value: typeof TreeNodeKey) => undefined,
    onChildUnmounted: (value: typeof TreeNodeKey) => undefined,
  })

  provide(TreeNodeKey, {
    props: computed(() => props),
  })

  onMounted(() => treeCategory && treeCategory.onChildMounted(TreeNodeKey))
  onBeforeUnmount(() => treeCategory && treeCategory.onChildUnmounted(TreeNodeKey))

  return {
    treeCategory,
  }
}

export default useTreeNode
