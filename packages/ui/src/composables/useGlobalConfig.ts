import { GLOBAL_CONFIG, ProvidedGlobalConfig, createGlobalConfig, provideForCurrentApp } from '../services/global-config'
import { getCurrentApp, inject } from '../services/current-app'

/** Use this function if you don't want to throw error if hook used outside setup function by useGlobalConfig */
export function useGlobalConfig () {
  let injected = inject<ProvidedGlobalConfig>(GLOBAL_CONFIG) as ProvidedGlobalConfig

  if (!injected) {
    injected = createGlobalConfig()

    provideForCurrentApp(injected)
  }

  return injected
}
