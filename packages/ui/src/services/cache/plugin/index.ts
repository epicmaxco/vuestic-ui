import type { InjectionKey } from 'vue'
import type { AppCache } from '../types'
import { defineVuesticPlugin } from '../../vue-plugin/utils'

export const VaAppCachePluginKey = Symbol('VaAppCachePlugin') as InjectionKey<AppCache>

/** Creates color css variables and reactively updates on ColorConfig changes. */
export const CachePlugin = defineVuesticPlugin(() => ({
  install (app) {
    const cache: AppCache = {
      colorContrast: {},
    }

    app.provide(VaAppCachePluginKey, cache)
  },
}))
