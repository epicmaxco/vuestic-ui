import { computed, getCurrentInstance } from 'vue'
import { getCurrentApp } from '../services/current-app'

/**
 * App context must be used as computed to support single app mode.
 *
 * Single app mode allows user to use composables as useColor, useToast, etc. outside of vue app.
 * (for example in api.ts)
 */
export const useAppContext = () => {
  return computed(() => {
    return getCurrentApp()?._context || getCurrentInstance()?.appContext
  })
}
