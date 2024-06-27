import { withCtx, h, DefineComponent, VNode, isVNode, Text, createBlock } from 'vue'
import type { SlotProp } from '../component-config'

type VueInternalRenderFunction = Function

export const renderSlotNode = (node: VNode, ctx = null) => {
  return withCtx(() => [node], ctx)
}

export const makeVNode = <T>(node: SlotProp<T>) => {
  if (typeof node === 'string') {
    return h(Text, node)
  }

  return isVNode(node) ? node : createBlock(node)
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
  const originalRenderFn = component.render || component.ssrRender

  if (!originalRenderFn) { return undefined }

  const compiledRenderedFn = originalRenderFn.name === '_sfc_render' || originalRenderFn.name === '_sfc_ssrRender'

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

    // When compile rendered function, it doesn't require thisArg
    const thisArg = compiledRenderedFn ? undefined : customCtx

    return originalRenderFn.call(thisArg, customCtx, ...args.slice(1))
  }
}
