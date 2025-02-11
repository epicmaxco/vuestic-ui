import { VaModal } from './VaModal'
import type { ModalOptions } from './types'
import { AppContext, nextTick, Slots, Component, h, VNode } from 'vue'
import { mount } from '../../composables/std/internal/useMount'

export const getModalOptions = (options: string | ModalOptions | Component): {
  props: ModalOptions,
  slots: VNode['children'] | undefined
} => {
  if (typeof options === 'string') {
    return {
      props: { message: options },
      slots: undefined,
    }
  }

  if (isComponent(options)) {
    return {
      props: {},
      slots: { default: () => h(options) },
    }
  }

  return {
    props: {},
    slots: undefined,
  }
}

export const isComponent = (customProps: ModalOptions | string | Component): customProps is Component => {
  return typeof customProps === 'object' && ('render' in customProps || 'template' in customProps)
}

export const createModalInstance = (props: ModalOptions, appContext: AppContext, slots?: VNode['children']) => {
  // handling the case when 'withoutTransitions = false'
  const onClose = (event: HTMLElement) => {
    props?.onClose?.(event)
    destroy()
  }

  const onUpdateModelValue = (value: boolean) => {
    props?.['onUpdate:modelValue']?.(value)

    if (!value) {
      nextTick(() => {
        destroy()
      })
    }
  }

  const { destroy } = mount(VaModal, {
    ...props,
    stateful: props?.stateful ?? true,
    modelValue: true,
    onClose,
    'onUpdate:modelValue': onUpdateModelValue,
  }, appContext, slots)

  return destroy
}
