import { createBreakpointsConfigPlugin } from './create-service'
import { defineGlobalProperty, defineVuesticPlugin } from '../../../vuestic-plugin/utils'

export const BreakpointsConfigPlugin = defineVuesticPlugin(() => ({
  install (app) {
    const breakpointsConfig = createBreakpointsConfigPlugin(app)
    app.provide('$vaBreakpoints', breakpointsConfig)
    defineGlobalProperty(app, '$vaBreakpoints', breakpointsConfig)
  },
}))

declare module 'vue' {
  export interface ComponentCustomProperties {
    $vaBreakpoints: ReturnType<typeof createBreakpointsConfigPlugin>
  }
}
