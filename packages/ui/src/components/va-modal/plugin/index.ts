import { App } from 'vue'
import { defineVuesticPlugin, defineGlobalProperty } from '../../../services/vue-plugin/utils'
import { createModalInstance } from '../modal'
import { ModalOptions } from '../types'

const createVaModalPlugin = (app: App) => ({
  init (options: string | ModalOptions) {
    return createModalInstance(options, app?._context)
  },
  confirm (options: string | ModalOptions) {
    if (typeof options === 'string') {
      return new Promise<boolean>((resolve) => {
        createModalInstance({
          message: options as string,
          onOk () {
            resolve(true)
          },
          onCancel () {
            resolve(false)
          },
        }, app?._context)
      })
    }

    return new Promise<boolean>((resolve) => {
      createModalInstance({
        ...options,
        onOk () {
          options?.onOk?.()
          resolve(true)
        },
        onCancel () {
          options?.onCancel?.()
          resolve(false)
        },
      }, app?._context)
    })
  },
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
