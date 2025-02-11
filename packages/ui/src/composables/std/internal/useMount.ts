import { type VNode, type AppContext, render, h, nextTick, getCurrentInstance, VNodeProps, Slots, isVNode, warn } from 'vue'
import { ComponentProps } from '../../../utils/component-options/types'

type Props = Record<string, any>
type VaVNode = VNode & { destroy: () => void }

export const destroy = (el: HTMLElement | null | undefined, vNode: VNode | null) => {
  if (el) {
    render(null, el)
    el.remove()
  }

  el = null
  vNode = null
}

const mergeSlots = (component: unknown, slots: VNode['children'] | undefined): VNode['children'] => {
  if (isVNode(component)) {
    if (component.children === null) {
      return slots ?? {}
    }

    if (Array.isArray(component.children) && Array.isArray(slots)) {
      return component.children
    }

    if (typeof component.children === 'string' && typeof component.children === 'string') {
      return component.children
    }

    if (typeof slots === 'string' || Array.isArray(slots)) {
      warn('Slots are not merged because component children is not an array')
      return component.children
    }

    return {
      ...component.children,
      ...slots,
    }
  }

  return slots ?? {}
}

const makeVNode = (component: any, props: Props | undefined, appContext: AppContext | undefined, slots: VNode['children'] | undefined, onDestroy: () => void): VaVNode => {
  if (isVNode(component) && !component.appContext) {
    component.appContext = appContext ?? null
    ;(component as VaVNode).destroy = onDestroy

    props = { ...props, ...component.props }
  }

  const vNode = h(component, {
    ...props,
    onDestroy,
    onBeforeUnmount: onDestroy,
  }, mergeSlots(component, slots) ?? {}) as VaVNode

  vNode.appContext = appContext ?? null
  vNode.destroy = onDestroy

  return vNode
}

export const mount = (
  component: any,
  props: Props | undefined,
  appContext: AppContext | undefined,
  slots: VNode['children'] | undefined,
): { vNode: VNode; el?: HTMLElement, destroy: () => void } => {
  const el: HTMLElement | undefined = document?.createElement('div')

  document.body.appendChild(el)

  const destroyVNode = () => {
    destroy(el, vNode)
  }

  const vNode = makeVNode(component, props, appContext, slots, destroyVNode)

  if (el) {
    render(vNode, el)
  }

  return { vNode, el, destroy: destroyVNode }
}

export const useMount = <C>(component: C) => {
  const appContext = getCurrentInstance()?.appContext

  if (!appContext) {
    throw new Error('useMount can be used only in setup function')
  }

  const createInstance = (props?: ComponentProps<C> & VNodeProps, slots?: Slots) => {
    const { vNode, el } = mount(component, props, appContext, slots)

    return () => {
      nextTick(() => {
        destroy(el, vNode)
      })
    }
  }

  return {
    createInstance,
  }
}
