import { inject } from '../services/current-app'
import { VaAppCachePluginKey } from '../services/cache/plugin/index'

export const useCache = () => {
  const cache = inject(VaAppCachePluginKey)

  if (!cache) {
    throw new Error('Vuestic cache plugin is not registered!')
  }

  return cache
}
