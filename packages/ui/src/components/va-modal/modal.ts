import VaModal from './index'
import type { MessageBoxOptions } from './types'
import { VNode, createVNode, render, AppContext } from 'vue'

type OptionKeys = keyof MessageBoxOptions;

let value = true;

const getNodeProps = (vNode: VNode): Record<OptionKeys, any> => {
  return (vNode.component?.props as Record<OptionKeys, any>) || {}
}

const mount = (component: any, {
  props,
  children,
  element,
  appContext,
}: { props?: { [key: string]: any }; children?: any; element?: HTMLElement, appContext?: AppContext } = {}): { vNode: VNode; el?: HTMLElement } => {
  let el: HTMLElement | null | undefined = element

  // eslint-disable-next-line prefer-const
  let vNode: VNode | null

  vNode = createVNode(component, { ...props, modelValue: value, onUpdateModelValue: ((event) => {value = event}), children)

  if (appContext) {
    vNode.appContext = appContext
  }

  if (el) {
    render(vNode, el)
  } else if (typeof document !== 'undefined') {
    render(vNode, el = document.body)
  }

  return { vNode, el }
}

const getModalOptions = (options: string | MessageBoxOptions): any => {
  if (typeof options === 'string') {
    return {
      message: options
    }
  }
  return options
}

export const createModalInstance = (customProps: MessageBoxOptions | string, appContext?: AppContext): void => {
  const { vNode, el } = mount(VaModal, { appContext, props: getModalOptions(customProps) })

  const nodeProps = getNodeProps(vNode)

  if (el && vNode.el && nodeProps) {
    document.body.appendChild(el.childNodes[0])
  }
}

export type { MessageBoxOptions } from './types'