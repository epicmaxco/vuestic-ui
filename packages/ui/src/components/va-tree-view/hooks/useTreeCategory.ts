import {
  nextTick,
  watch,
  onMounted,
  onBeforeUnmount,
  ref,
  provide,
  inject,
  ComponentPublicInstance,
  Ref,
} from 'vue'
import VaTreeNode from '../VaTreeNode/VaTreeNode.vue'
import {
  ITreeCategory,
  ITreeNodeCommon,
  TreeCategoryProps,
  TreeCategoryKey,
  TreeViewKey,
} from '../types'

export const useTreeCategory = (props: TreeCategoryProps) => {
  type NodeComponent = ComponentPublicInstance<ITreeCategory | typeof VaTreeNode>

  const nodes: Ref<NodeComponent[]> = ref([])
  const isOpenCached = ref<boolean | undefined>(false)

  const onChildMounted = (node: NodeComponent) => {
    nodes.value.push(node)
  }

  const onChildUnmounted = (removableNode: NodeComponent) => {
    nodes.value = nodes.value.filter((node: NodeComponent) => node !== removableNode)
  }

  const treeView: ITreeNodeCommon<ITreeCategory | typeof VaTreeNode> = inject(TreeViewKey, {
    onChildMounted: (value: ITreeCategory | typeof VaTreeNode) => undefined,
    onChildUnmounted: (value: ITreeCategory | typeof VaTreeNode) => undefined,
  })

  const collapse = () => {
    isOpenCached.value = false

    nextTick(() => {
      nodes.value.forEach((child: ComponentPublicInstance) => {
        if (child.$options.name === 'va-tree-category') {
          (child as ComponentPublicInstance<ITreeCategory>).collapse()
        }
      })
    })
  }

  const expand = () => {
    isOpenCached.value = true

    nextTick(() => {
      nodes.value.forEach((child: NodeComponent) => {
        child.expand?.()
      })
    })
  }

  const toggle = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).classList.contains('va-checkbox__input')) {
      isOpenCached.value = !isOpenCached.value
    }
  }

  watch(
    () => props.isOpen,
    (isOpen) => {
      isOpenCached.value = isOpen
    },
    { immediate: true })

  const treeCategory: ITreeCategory = {
    treeView,
    nodes: nodes.value,
    isOpenCached: isOpenCached.value,
    onChildMounted,
    onChildUnmounted,
    collapse,
    expand,
    toggle,
  }

  provide(TreeCategoryKey, treeCategory)
  onMounted(() => treeView?.onChildMounted(treeCategory))
  onBeforeUnmount(() => treeView?.onChildUnmounted(treeCategory))

  return {
    treeCategory,
    treeView,
    nodes,
    isOpenCached,
    collapse,
    expand,
    toggle,
  }
}
