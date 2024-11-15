import { computed, getCurrentInstance } from 'vue'
import { getCurrentApp } from '../../../services/current-app'

/**
 * App context must be used as computed to support single app mode.
 *
 * Single app mode allows user to use composables as useColor, useToast, etc. outside of vue app.
 * (for example in api.ts)
 */
export const useAppContext = () => {
  const currentInstance = getCurrentInstance()

  return computed(() => {
    return getCurrentApp()?._context || currentInstance?.appContext
  })
}
