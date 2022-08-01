import { createBreakpointsConfigPlugin } from './create-service'
import { defineGlobalProperty, defineVuesticPlugin } from '../../../vuestic-plugin/utils'

import { BreakpointsSymbol } from '../types'

export const BreakpointsConfigPlugin = defineVuesticPlugin(() => ({
  install (app) {
    const breakpointsConfig = createBreakpointsConfigPlugin(app)
    app.provide(BreakpointsSymbol, breakpointsConfig)
    defineGlobalProperty(app, '$vaBreakpoints', breakpointsConfig)
  },
}))

declare module 'vue' {
  export interface ComponentCustomProperties {
    $vaBreakpoints: ReturnType<typeof createBreakpointsConfigPlugin>
  }
}
