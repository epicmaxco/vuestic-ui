import { addPluginTemplate, useNuxt } from '@nuxt/kit'

import { resolveInRuntime } from '../utils/resolve'

import type { VuesticOptions } from '../types'

/** Register vuestic nuxt plugin */
export const useVuesticPlugin = (options: VuesticOptions) => {
  const pluginPath = resolveInRuntime('./runtime/plugin.mjs')

  const nuxt = useNuxt()

  ;(nuxt.options.runtimeConfig.public as any)['#vuestic-public-options-config'] = options.config
  ;(nuxt.options.runtimeConfig.public as any)['#vuestic-public-options-theme-cookie-key'] = options.themeCookieKey

  addPluginTemplate({
    src: pluginPath,
    filename: pluginPath.split('/').pop()
  })
}
