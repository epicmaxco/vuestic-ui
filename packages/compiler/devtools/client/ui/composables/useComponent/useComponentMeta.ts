import { Ref, VNode, computed } from 'vue';

const getVNodeComponent = (vNode: VNode | null) => {
  if (!vNode) return null

  if (!('ctx' in vNode)) { return null }

  const ctx = vNode.ctx as any

  if (!ctx) { 
    if (typeof vNode.type === 'string') {
      return { name: vNode.type, props: {} }
    }
    return null
  }

  return {
    name: ctx.type.__name as string || undefined,
    props: ctx.type.props as Record<string, { default?: unknown, type?: BooleanConstructor | StringConstructor }>,
  }
}

export const useComponentMeta = (vNode: Ref<VNode | null>) => {
  return computed(() => ({
    type: vNode.value?.type,
    ...getVNodeComponent(vNode.value),
  }))
}
