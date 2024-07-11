import { Plugin, ResolvedConfig, createLogger } from 'vite'
import { createFilter, FilterPattern } from '@rollup/pluginutils'
import { transformFile } from './compiler'
import { devtoolsServerMiddleware } from '../server/server-middleware'
import { fileURLToPath, URL } from 'node:url'
import { addVuePlugin } from './add-vue-plugin'
import chalk from 'chalk'

export type PluginOptions = {
  include?: FilterPattern
  exclude?: FilterPattern
}

const ALT_KEY = process.platform === 'darwin' ? 'Option ⌥' : 'Alt'

const logger = createLogger('info', {
  prefix: '[vuestic:devtools]'
})

export const devtools = (options: PluginOptions = {}): Plugin => {
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

      if (/\/src\/main\.(ts|js|mjs|mts)$/.test(id)) {
        const newCode = addVuePlugin(code)

        if (newCode) {
          logger.info(chalk.gray('Plugin successfully added to the Vue app.'), {
            timestamp: true,
          })
          logger.info(chalk.gray(`Open your application and press `) + chalk.cyan(ALT_KEY) + chalk.gray(' + ') + chalk.cyan('F12') + chalk.gray(' to open devtools.'), {
            timestamp: true,
          })
        } else {
          logger.error(chalk.yellow('Devtools plugin can not find createApp(App) in your main file. This is likely a bug, please, open an issue on GitHub.'), {
            timestamp: true,
          })
        }

        return newCode
      }

      if (!filter(id)) {
        return
      }

      return transformFile(code, id)
    },
  }
}
