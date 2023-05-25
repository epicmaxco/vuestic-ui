import type { InjectionKey } from 'vue'
import type { AppCache } from '../types'
import { defineVuesticPlugin } from '../../vue-plugin/utils'
import { TempMap } from '../../../utils/temp-map'

export const VaAppCachePluginKey = Symbol('VaAppCachePlugin') as InjectionKey<AppCache>

/** Creates color css variables and reactively updates on ColorConfig changes. */
export const CachePlugin = defineVuesticPlugin(() => ({
  install (app) {
    const cache: AppCache = {
      colorContrast: {},
      bgTempCache: new TempMap(),
    }

    app.provide(VaAppCachePluginKey, cache)
  },
}))
