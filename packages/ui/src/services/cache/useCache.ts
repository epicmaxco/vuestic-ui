import { inject } from 'vue'
import { VaAppCachePluginKey, VaAppCachePluginKeyValue } from './plugin/index'

export const useCache = () => {
  return inject<VaAppCachePluginKeyValue>(VaAppCachePluginKey, {
    colorContrast: {},
  })
}
