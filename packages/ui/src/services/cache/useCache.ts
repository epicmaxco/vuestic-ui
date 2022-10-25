import { inject } from '../current-app'
import { VaAppCachePluginKey, VaAppCachePluginKeyValue } from './plugin/index'

export const useCache = () => {
  return inject<VaAppCachePluginKeyValue>(VaAppCachePluginKey, {
    colorContrast: {},
  })
}
