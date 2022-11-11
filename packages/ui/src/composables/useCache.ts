import { inject } from '../services/current-app'
import { VaAppCachePluginKey } from '../services/cache/plugin/index'

export const useCache = () => inject(VaAppCachePluginKey, {
  colorContrast: {},
})
