
import { type VNode, type AppContext, render, h, nextTick, getCurrentInstance, VNodeProps } from 'vue'
import { ComponentProps } from '../../../utils/component-options/types'

type Props = Record<string, any>

const destroy = (el: HTMLElement | null | undefined, vNode: VNode | null) => {
  if (el) {
    render(null, el)
    el.remove()
  }

  el = null
  vNode = null
}

const mount = (
  component: any,
  { props, appContext, onDestroy }: { props?: Props; appContext?: AppContext, onDestroy?: () => void } = {},
): { vNode: VNode; el?: HTMLElement } => {
  const el: HTMLElement | undefined = document?.createElement('div')

  document.body.appendChild(el)

  const vNode: VNode | null = h(component, {
    ...props,
    onDestroy,
    onBeforeUnmount: onDestroy,
  })

  if (appContext) {
    vNode.appContext = appContext
  }

  if (el) {
    render(vNode, el)
  }

  return { vNode, el }
}

export const useMount = <C>(component: C) => {
  const appContext = getCurrentInstance()?.appContext

  if (!appContext) {
    throw new Error('useMount can be used only in setup function')
  }

  const createInstance = (props: ComponentProps<C> & VNodeProps) => {
    const { vNode, el } = mount(component, {
      props: props as Props,
      appContext,
      onDestroy () {
        destroy(el, vNode)
      },
    })
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
