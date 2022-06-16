import { VaModal } from './VaModal'
import type { ModalOptions } from './types'
import { VNode, render, AppContext, h, nextTick } from 'vue'

type OptionKeys = keyof ModalOptions;

const getNodeProps = (vNode: VNode): Record<OptionKeys, any> => {
  return (vNode.component?.props as Record<OptionKeys, any>) || {}
}

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
  { props, appContext }: { props?: ModalOptions; appContext?: AppContext } = {},
): { vNode: VNode; el?: HTMLElement } => {
  const el: HTMLElement | undefined = document?.createElement('div')

  // eslint-disable-next-line prefer-const
  let vNode: VNode | null

  // handling the case when 'withoutTransitions = false'
  const onClose = (event: HTMLElement) => {
    props?.onClose?.(event)
    destroy(el, vNode)
  }

  // handling the case when 'withoutTransitions = true'
  const onUpdateModelValue = (value: boolean) => {
    props?.['onUpdate:modelValue']?.(value)

    if (props?.withoutTransitions && !value) {
      nextTick(() => { // this is required for all handlers to execute
        destroy(el, vNode)
      })
    }
  }

  vNode = h(component, {
    ...props,
    stateful: props?.stateful ?? true,
    modelValue: true,
    onClose,
    'onUpdate:modelValue': onUpdateModelValue,
  })

  if (appContext) {
    vNode.appContext = appContext
  }

  if (el) {
    render(vNode, el)
  }

  return { vNode, el }
}

const getModalOptions = (options: string | ModalOptions): ModalOptions => typeof options === 'string'
  ? { message: options }
  : options

export const createModalInstance = (customProps: ModalOptions | string, appContext?: AppContext): VNode => {
  const { vNode, el } = mount(VaModal, { appContext, props: getModalOptions(customProps) })

  if (el && vNode.el && getNodeProps(vNode)) {
    document.body.appendChild(el.childNodes[0])
  }

  return vNode
}
