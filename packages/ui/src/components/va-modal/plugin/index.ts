import { App } from 'vue'
import { defineVuesticPlugin, defineGlobalProperty } from '../../../vuestic-plugin/utils'
import { createModalInstance, MessageBoxOptions } from '../modal'

const createVaModalPlugin = (app: App) => ({
  init (options: string | MessageBoxOptions) {
    createModalInstance(options, app?._context)
  },
})

export const VaModalPlugin = defineVuesticPlugin(() => ({
  install (app) {
    defineGlobalProperty(app, '$vaModal', createVaModalPlugin(app))
  },
}))

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $vaModal: ReturnType<typeof createVaModalPlugin>
  }
}
