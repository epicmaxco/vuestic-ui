import { existsSync } from 'fs'
import { resolveAlias, useNuxt } from '@nuxt/kit'
import { resolve } from 'pathe'
import { resolveInRuntime } from './../utils/resolve'

export const useConfigFile = () => {
  const root = resolveAlias('~/')
  const configPath = resolve(root, 'vuestic.config.ts')
  const nuxt = useNuxt()

  if (existsSync(configPath)) {
    nuxt.options.alias['#vuestic-config'] = configPath
  } else {
    nuxt.options.alias['#vuestic-config'] = resolveInRuntime('./runtime/config.mjs')
  }

  // restart nuxt when vuestic config changes
  nuxt.options.watch.push('vuestic.config.ts')
}
