import { createBreakpointConfigPlugin } from './create-service'
import { defineGlobalProperty, defineVuesticPlugin } from '../../../vuestic-plugin/utils'

import { vaBreakpointSymbol } from '../'

export const BreakpointConfigPlugin = defineVuesticPlugin(() => ({
  install (app) {
    const breakpointConfig = createBreakpointConfigPlugin(app)
    app.provide(vaBreakpointSymbol, breakpointConfig)
    defineGlobalProperty(app, '$vaBreakpoint', breakpointConfig)
  },
}))

declare module 'vue' {
  export interface ComponentCustomProperties {
    $vaBreakpoint: ReturnType<typeof createBreakpointConfigPlugin>
  }
}
