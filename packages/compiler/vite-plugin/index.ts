import { createLogger, Plugin } from "vite"
import { devtools, PluginOptions as DevtoolsPluginOptions } from "../devtools"
import { cssLayers } from "../css-layers"
import { vuesticConfig, Options as VuesticConfigPluginOptions } from "../vuestic-config"
import { mergeDeep } from "../shared/merge-deep"

type Options = {
  /** @default true */
  devtools?: boolean | DevtoolsPluginOptions,

  /**
   * Adds CSS layers to Vuestic UI
   * Helps control the order of CSS in the final bundle
   *
   * @default false
   *
   * Add `vuestic.components` and `vuestic.styles` CSS layers
   *
   * @notice This will make Vuestic styles less important. Make sure you don't have any global conflicting styles.
   * For example. tailwind have normalize css included. It may have higher priority than Vuestic styles and components might look broken.
   */
  cssLayers?: boolean,

  /**
   * Path to the Vuestic config file
   *
   * @default 'vuestic.config.ts'
   *
   * Make sure to include generated types to your tsconfig.json
   *
   * ```json
   * {
   *   "include": ["node_modules/.vuestic/*.d.ts", "src/**\/*.d.ts"]
   * }
   * ```
   */
  config?: boolean | VuesticConfigPluginOptions,
}

const logger = createLogger('info', {
  prefix: '[vuestic:compiler]'
})

const defaultOptions: Required<Options> = {
  devtools: false,
  cssLayers: false,
  config: {
    configPath: 'vuestic.config.ts'
  },
}

export const vuestic = (options: Options = {}): Plugin[] => {
  options = mergeDeep(defaultOptions, options)

  const extractOptions = (key: keyof Options) => {
    // Build fails without as Record<string, string> cast
    return typeof options[key] === 'object' ? options[key] as Record<string, string> : undefined
  }

  const plugins = []

  if (options.devtools !== false) {
    logger.info('Using vuestic:devtools', {
      timestamp: true,
    })
    plugins.push(devtools(extractOptions('devtools')))
  }

  if (options.cssLayers !== false) {
    logger.info('Using vuestic:css-layers', {
      timestamp: true,
    })
    plugins.push(cssLayers)
  }

  if (Boolean(options.config)) {
    logger.info('Using vuestic:config', {
      timestamp: true,
    })
    plugins.push(...vuesticConfig(extractOptions('config')))

  }

  return plugins
}
