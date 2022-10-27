import { inject } from '../services/current-app'
import { VaAppCachePluginKey, VaAppCachePluginKeyValue } from '../services/cache/plugin/index'

export const useCache = () => inject<VaAppCachePluginKeyValue>(VaAppCachePluginKey, {
  colorContrast: {},
})
