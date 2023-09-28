import { inject } from '../services/current-app'
import { VaAppCachePluginKey } from '../services/cache/plugin/index'
import { AppCache } from '../services/cache/types'

export const useCache = (): AppCache => {
  const cache = inject(VaAppCachePluginKey)

  if (!cache) {
    return {
      colorContrast: {},
    }
  }

  return cache
}
