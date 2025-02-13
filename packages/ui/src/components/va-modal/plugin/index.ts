import { App, Component } from 'vue'
import { defineVuesticPlugin, defineGlobalProperty } from '../../../services/vue-plugin/utils'
import { createModalInstance, getModalOptions } from '../modal'
import { ModalOptions } from '../types'
import { MakeInitModalFunction } from '../hooks/useModal'

const createVaModalPlugin = (app: App) => ({
  init: ((optionsOrComponent: string | ModalOptions | Component, options?: ModalOptions) => {
    const { props, slots } = getModalOptions(optionsOrComponent)
    return createModalInstance(options ?? props, app._context, slots)
  }) as MakeInitModalFunction<() => void>,
  confirm: ((optionsOrComponent: string | ModalOptions | Component, options: ModalOptions = {}) => {
    const { props, slots } = getModalOptions(optionsOrComponent)

    return new Promise<boolean>((resolve, reject) => {
      createModalInstance({
        ...options,
        ...props,
        onOk () {
          props?.onOk?.()
          resolve(true)
        },
        onCancel () {
          props?.onCancel?.()
          resolve(false)
        },
      }, app._context, slots)
    })
  }) as MakeInitModalFunction<Promise<boolean>>,
})

export const VaModalPlugin = defineVuesticPlugin(() => ({
  install (app) {
    defineGlobalProperty(app, '$vaModal', createVaModalPlugin(app))
  },
}))

declare module 'vue' {
  export interface ComponentCustomProperties {
    $vaModal: ReturnType<typeof createVaModalPlugin>
  }
}
