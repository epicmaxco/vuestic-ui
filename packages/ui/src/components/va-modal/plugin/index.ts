import { App } from 'vue'
import { defineVuesticPlugin, defineGlobalProperty } from '../../../vuestic-plugin/utils'

const createVaModalPlugin = (app: App) => ({
  init () {
    console.log('va-modal.init')
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
