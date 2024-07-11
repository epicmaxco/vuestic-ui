import { computed, type VNode, type Ref } from 'vue';

export const useVNode = (htmlElement: Ref<HTMLElement | null>) => {
  const vNode = computed(() => {
    if (!htmlElement.value) return null

    return (htmlElement.value as any).__vnode as VNode ?? null
  })

  const props = computed(() => {
    if (!vNode.value) return null

    if (!('ctx' in vNode.value)) {
      return null
    }

    return (vNode.value.ctx as any)?.props as Record<string, any> ?? null
  })

  return {
    vNode,
    props,
  }
}
