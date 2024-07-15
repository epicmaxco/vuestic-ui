import { Ref, VNode, computed } from 'vue';

const getVNodeComponent = (vNode: VNode | null) => {
  if (!vNode) return null

  if (typeof vNode.type === 'string') {
    return { name: vNode.type, props: {} }
  }

  if (typeof vNode.type === 'object') {
    if ('__name' in vNode.type) {
      return {
        name: vNode.type.__name as string || undefined,
        props: vNode.type.props as Record<string, { default?: unknown, type?: BooleanConstructor | StringConstructor }>,
      }
    }

    if ('name' in vNode.type) {
      return {
        name: vNode.type.name as string || undefined,
        props: vNode.props as Record<string, { default?: unknown, type?: BooleanConstructor | StringConstructor }>,
      }
    }
  }


  return {
    name: vNode.el?.tagName ?? 'unknown',
    props: {} as Record<string, { default?: unknown, type?: BooleanConstructor | StringConstructor }>,
  }
}

export const useComponentMeta = (vNode: Ref<VNode | null>) => {
  return computed(() => ({
    type: vNode.value?.type,
    ...getVNodeComponent(vNode.value),
  }))
}
