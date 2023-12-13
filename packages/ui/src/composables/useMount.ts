
import { type VNode, type AppContext, render, h, nextTick, getCurrentInstance } from 'vue'
import { type VuesticComponent } from '../services/vue-plugin/types'

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
  { props, appContext }: { props?: Props; appContext?: AppContext } = {},
): { vNode: VNode; el?: HTMLElement } => {
  const el: HTMLElement | undefined = document?.createElement('div')

  document.body.appendChild(el)

  const vNode: VNode | null = h(component, {
    ...props,
    stateful: props?.stateful ?? true,
  })

  if (appContext) {
    vNode.appContext = appContext
  }

  if (el) {
    render(vNode, el)
  }

  return { vNode, el }
}

export const useMount = (component: VuesticComponent) => {
  const appContext = getCurrentInstance()?.appContext

  if (!appContext) {
    throw new Error('useMount can be used only in setup function')
  }

  const createInstance = (props: Props) => {
    const { vNode, el } = mount(component, { props, appContext })
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
