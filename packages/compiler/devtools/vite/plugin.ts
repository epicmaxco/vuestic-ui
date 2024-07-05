import { Plugin, ResolvedConfig } from 'vite'
import { createFilter, FilterPattern } from '@rollup/pluginutils'
import { transformFile } from './compiler'
import { devtoolsServerMiddleware } from './server/server-middleware'
import { fileURLToPath, URL } from 'node:url'
import { addVuePlugin } from './add-vue-plugin'

type PluginOptions = {
  include?: FilterPattern
  exclude?: FilterPattern
}

export const vuesticDevtools = (options: PluginOptions = {}): Plugin => {
  const filter = createFilter(
    options.include ?? ['**/*.vue'],
    options.exclude ?? ['node_modules/**']
  )

  let config: ResolvedConfig

  return {
    name: 'vuestic:devtools',

    configureServer(server) {
      server.middlewares.use(devtoolsServerMiddleware())
    },

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    async resolveId(id) {
      if (id.startsWith('@vuestic/compiler/devtools')) {
        if (config.isProduction) {
          throw new Error('VuesticDevtools: devtools must not be imported in production')
        }

        return fileURLToPath(new URL('../client/index.ts', import.meta.url))
      }
    },

    transform(code, id) {
      if (config.isProduction) {
        return
      }

      if (id.endsWith('/src/main.ts')) {
        return addVuePlugin(code)
      }

      if (!filter(id)) {
        return
      }

      return transformFile(code, id)
    },
  }
}
