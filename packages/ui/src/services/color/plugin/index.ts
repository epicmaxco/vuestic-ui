import { createColorConfigPlugin } from './create-color-config-plugin'
import { defineGlobalProperty, defineVuesticPlugin } from '../../vue-plugin/utils'

/** Creates color css variables and reactively updates on ColorConfig changes. */
export const ColorConfigPlugin = defineVuesticPlugin(() => ({
  install (app) {
    defineGlobalProperty(app, '$vaColorConfig', createColorConfigPlugin(app))
  },
}))

declare module 'vue' {
  export interface ComponentCustomProperties {
    $vaColorConfig: ReturnType<typeof createColorConfigPlugin>
  }
}
