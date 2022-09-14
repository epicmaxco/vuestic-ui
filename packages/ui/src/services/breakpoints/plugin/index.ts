import { createBreakpointsConfigPlugin } from './create-service'
import { defineGlobalProperty, defineVuesticPlugin } from '../../../vuestic-plugin/utils'

import { vaBreakpointsSymbol } from '../'

export const BreakpointsConfigPlugin = defineVuesticPlugin(() => ({
  install (app) {
    const breakpointsConfig = createBreakpointsConfigPlugin(app)
    app.provide(vaBreakpointsSymbol, breakpointsConfig)
    defineGlobalProperty(app, '$vaBreakpoints', breakpointsConfig)
  },
}))

declare module 'vue' {
  export interface ComponentCustomProperties {
    $vaBreakpoints: ReturnType<typeof createBreakpointsConfigPlugin>
  }
}
