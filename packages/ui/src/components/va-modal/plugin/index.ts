import { App } from 'vue'
import { defineVuesticPlugin, defineGlobalProperty } from '../../../services/vue-plugin/utils'
import { createModalInstance } from '../modal'
import { ModalOptions } from '../types'

const createVaModalPlugin = (app: App) => ({
  init (options: string | ModalOptions) {
    return createModalInstance(options, app?._context)
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
