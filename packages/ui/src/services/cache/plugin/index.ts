import type { App } from 'vue'
import { AppCache } from '../types'
import { defineVuesticPlugin } from '../../../vuestic-plugin/utils'

const createAppCachePlugin = (app: App) => {
  const cache: AppCache = ({
    colorContrast: {},
  })

  return cache
}

export type VaAppCachePluginKeyValue = ReturnType<typeof createAppCachePlugin>

export const VaAppCachePluginKey = Symbol('VaAppCachePlugin')

/** Creates color css variables and reactively updates on ColorConfig changes. */
export const CachePlugin = defineVuesticPlugin(() => ({
  install (app) {
    const cache = createAppCachePlugin(app)

    app.provide(VaAppCachePluginKey, cache)
  },
}))
