import { existsSync } from 'fs'
import { resolveAlias, useNuxt } from '@nuxt/kit';
import { resolve } from 'pathe'
import { resolveInRuntime } from './../utils/resolve';

export const useConfigFile = async () => {
  const root = resolveAlias('~/')
  const configPath = resolve(root, 'vuestic.config.ts')
  const nuxt = useNuxt()

  console.log('Searching for', resolve(root, 'vuestic.config.ts'))
  if (existsSync(configPath)) {
    console.log('Found config from ', configPath)
    nuxt.options.alias['#vuestic-config'] = configPath
  } else {
    nuxt.options.alias['#vuestic-config'] = resolveInRuntime('./runtime/config.mjs')
  }
}
