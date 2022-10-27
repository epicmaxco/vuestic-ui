import type { AppCache } from '../types'
import { defineVuesticPlugin } from '../../vue-plugin/utils'

export type VaAppCachePluginKeyValue = AppCache
export const VaAppCachePluginKey = Symbol('VaAppCachePlugin')

/** Creates color css variables and reactively updates on ColorConfig changes. */
export const CachePlugin = defineVuesticPlugin(() => ({
  install (app) {
    const cache: AppCache = {
      colorContrast: {},
    }

    app.provide(VaAppCachePluginKey, cache)
  },
}))
