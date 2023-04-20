import type { App, provide as vueProvide } from 'vue'
import { inject as vueInject, getCurrentInstance } from 'vue'

/**
 * Similar to `getCurrentInstance` but for plugins, so we can use inject in plugins.
 */
let app: App | null
let singleApp: App | null | undefined

export const setCurrentApp = (instance: App | null) => {
  app = instance

  if (singleApp && instance !== singleApp) {
    // This means that user has multiple apps on page.
    singleApp = null
  } else {
    singleApp = instance
  }
}

/**
 * Returns current app if Vuestic UI is used in single app mode.
 *
 * @throws Error if Vuestic UI is used in multiple apps.
 * @throws Error if Vuestic UI plugin is not installed.
 */
export const getCurrentApp = () => {
  const app = getCurrentInstance()?.appContext.app
  if (app) { return app }

  if (singleApp === undefined) {
    throw new Error('Vuestic UI plugin is not installed.')
  }
  if (singleApp === null) {
    throw new Error('Vuestic UI is used in multiple apps. You`re not allowed to use composable outside of setup function context.')
  }
  return singleApp
}

/** Wrapper around vue inject, so we can use it in plugins and outside of setup context if only one app is used */
export const inject = ((key: string, value?: any) => {
  const app = getCurrentApp()?._context.provides[key]

  return app || vueInject(key, value)
}) as typeof vueInject

/** Wrapper around vue provide, so we can use it in plugins and outside of setup context if only one app is used */
export const provide = ((key: string, value: any) => {
  const provides = getCurrentInstance()?.appContext.provides || getCurrentApp()._context.provides

  provides[key] = value
}) as typeof vueProvide
