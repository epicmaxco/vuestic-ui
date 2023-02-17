import { existsSync, writeFileSync, readFileSync } from 'fs'
import { resolveAlias, useNuxt } from '@nuxt/kit';
import { resolve } from 'pathe'
import { resolveInRuntime } from './../utils/resolve';
import { watch } from 'chokidar'

export const useConfigFile = async () => {
  const root = resolveAlias('~/')
  const configPath = resolve(root, 'vuestic.config.ts')
  const nuxtConfigPath = resolve(root, 'nuxt.config.ts')
  const nuxt = useNuxt()

  const restartNuxt = () => {
    writeFileSync(nuxtConfigPath, readFileSync(nuxtConfigPath, 'utf-8'))
  }

  if (existsSync(configPath)) {
    nuxt.options.alias['#vuestic-config'] = configPath
  } else {
    nuxt.options.alias['#vuestic-config'] = resolveInRuntime('./runtime/config.mjs')
  }

  const watcher = watch(configPath)
    .on('ready', () => {
      watcher
        .on('add', restartNuxt)
        .on('unlink', restartNuxt)
    })

}
