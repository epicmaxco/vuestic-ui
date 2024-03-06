import { openBlock, resolveDynamicComponent, createBlock, withCtx, RenderFunction, h, VNodeChild, DefineComponent, VNode } from 'vue'

type VueInternalRenderFunction = Function

export const renderSlotNode = (node: VNode, ctx = null) => {
  return withCtx(() => [openBlock(), createBlock(resolveDynamicComponent(h(node)))], ctx)
}

const renderSlots = (slots: Record<string, VNode | VueInternalRenderFunction>, ctx = null) => {
  return Object.keys(slots).reduce((acc, slotName) => {
    const slot = slots[slotName]

    // Maybe already compiled slot or just VNode provided by user
    acc[slotName] = typeof slot === 'function' ? slot : renderSlotNode(slot, ctx)

    return acc
  }, {} as Record<string, VueInternalRenderFunction>)
}

export const createRenderFn = (component: DefineComponent): VueInternalRenderFunction | undefined => {
  const originalRenderFn = component.render

  if (!originalRenderFn) { return undefined }

  const compiledRenderedFn = originalRenderFn.name === '_sfc_render'

  return function (...args: any[]) {
    const ctx = args[0]

    const slots = ctx.$.slots

    const customCtx = new Proxy(ctx, {
      get (target, key: any) {
        if (key === '$slots') {
          return renderSlots(slots)
        }

        return target[key]
      },
    })

    const thisArg = compiledRenderedFn ? undefined : ctx

    return originalRenderFn.call(thisArg, customCtx, ...args.slice(1))
  }
}
