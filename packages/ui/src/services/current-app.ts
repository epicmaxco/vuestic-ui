import type { App } from 'vue'
import { inject as vueInject } from 'vue'

/**
 * Similar to `getCurrentInstance` but for plugins, so we can use inject in plugins.
 */
let app: App | null

export const setCurrentApp = (instance: App | null) => { app = instance }
export const getCurrentApp = () => app

/** Wrapper around vue inject, so it can be used in plugins */
export const inject = ((key: string, value?: any) => {
  const app = getCurrentApp()?._context.provides[key]

  return app || vueInject(key, value)
}) as unknown as typeof vueInject
