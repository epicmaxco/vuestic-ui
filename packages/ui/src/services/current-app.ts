import type { App } from 'vue'
import { inject as vueInject } from 'vue'
import { throwError } from '../utils/console'

/**
 * Similar to `getCurrentInstance` but for plugins, so we can use inject in plugins.
 */
let currentApp: App | null = null
let prevRegisteredApp: App | null = null

export const setCurrentApp = (newApp: App | null) => {
  // If prev app unregistered, set it to null
  if (prevRegisteredApp?._instance === null) {
    prevRegisteredApp = null
  }

  // Disallow setting current app to null if prev app is not unregistered
  if (newApp === null && prevRegisteredApp === null) { return }

  // In case prevApp registered we allow currentApp to be null
  // This is used to understand if we're in single app mode
  // If user have registered app once we allow him to use composables outside of setup function
  // Otherwise we throw error because we don't know which app context to use
  prevRegisteredApp = currentApp
  currentApp = newApp
}

export const getCurrentApp = () => currentApp

/** Wrapper around vue inject, so it can be used in plugins */
export const inject = ((key: string, value?: any) => {
  const injectedFromApp = getCurrentApp()?._context.provides[key]

  // In case user in single app mode, we allow him to use composables outside of setup function
  return injectedFromApp ?? vueInject(key, value) ?? throwError('You\'re using Vuestic composable outside Vue app. Since you registered Vuestic in multiple apps, composables can not be used outside setup function anymore.')
}) as unknown as typeof vueInject
