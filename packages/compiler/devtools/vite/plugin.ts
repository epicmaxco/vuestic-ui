import { Plugin } from 'vite'
import { createFilter, FilterPattern } from '@rollup/pluginutils'
import { transformFile } from './compiler'
import { devtoolsServerMiddleware } from './server/server-middleware'

type PluginOptions = {
  include?: FilterPattern
  exclude?: FilterPattern
}

export const vuesticDevtools = (options: PluginOptions = {}): Plugin => {
  const filter = createFilter(
    options.include ?? ['**/*.vue'],
    options.exclude ?? ['node_modules/**']
  )

  return {
    name: 'vuestic:devtools',

    configureServer(server) {
      server.middlewares.use(devtoolsServerMiddleware())
    },

    transform(code, id) {
      if (!filter(id)) {
        return
      }

      return transformFile(code, id)
    },
  }
}
