import { Plugin } from 'vite'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

const VUESTIC_CONFIG_ALIAS = '#vuestic-config'

export const resolveVuesticConfigPath = () => {
  if (existsSync('./vuestic.config.ts')) {
    return './vuestic.config.ts'
  } else if (existsSync('./vuestic.config.js')) {
    return './vuestic.config.js'
  } else if (existsSync('./vuestic.config.mjs')) {
    return './vuestic.config.mjs'
  } else if (existsSync('./vuestic.config.cjs')) {
    return './vuestic.config.cjs'
  } else if (existsSync('./vuestic.config.mts')) {
    return './vuestic.config.mts'
  } else {
    return undefined
  }
}

export const tryToReadConfig = async (path: string) => {
  if (existsSync(path)) {
    return readFile(path, 'utf-8')
  }

  return null
}

export const isConfigExists = (configPath: string | undefined) => {
  if (!configPath) {
    return resolveVuesticConfigPath()
  }

  return existsSync(configPath)
}

/** This plugin is used to resolve path to vuestic config if it is imported with `#vuestic-config` */
export const configResolver =  (options: {
  configPath?: string
} = {}): Plugin => {

  return {
    name: 'vuestic:config-resolver',

    // Resolve vuestic config alias
    async resolveId(source) {
      if (source === VUESTIC_CONFIG_ALIAS) {
        return `virtual:vuestic-config`
      }
    },

    async load(id) {
      const {
        configPath = resolveVuesticConfigPath()
      } = options

      if (id === `virtual:vuestic-config`) {
        if (!configPath) {
          return 'export default {}'
        }

        const config = await tryToReadConfig(configPath)

        if (config) {
          return config
        } else if (options.configPath) {
          throw new Error(`Vuestic config file not found at ${configPath}`)
        } else {
          'export default {}'
        }
      }
    },
  }
}
