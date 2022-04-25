import type { Plugin, App, ComponentCustomProperties } from 'vue'
import { createColorConfigPlugin } from './create-color-config-plugin'
import { defineGlobalProperty } from '../../../vuestic-plugin/utils'

/** Creates color css variables and reactively updates on ColorConfig changes. */
export const ColorConfigPlugin: Plugin = {
  install (app) {
    defineGlobalProperty(app, '$vaColorConfig', createColorConfigPlugin(app))
  },
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $vaColorConfig: ReturnType<typeof createColorConfigPlugin>
  }
}
