import { Plugin } from "vite"
import { vuesticTsConfig } from "../tsconfig-plugin"
import { devtools, PluginOptions as DevtoolsPluginOptions } from "../devtools"
import { cssLayers } from "../css-layers"
import { vuesticConfig, Options as VuesticConfigPluginOptions } from "../vuestic-config"
import { vuesticAutoImport } from "../auto-import"
import { mergeDeep } from "../shared/merge-deep"
import { logger } from "../logger"
import { getProjectEnv } from "../shared/project-env"
import { formatString } from "../shared/color"

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
   */
  config?: boolean | VuesticConfigPluginOptions,

  /**
   * Auto import components and inject plugin
   *
   * @default false
   */
  autoImport?: boolean,
}

const defaultOptions: Required<Options> = {
  devtools: true,
  cssLayers: false,
  autoImport: true,
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

  const env = getProjectEnv()

  if (!env?.hasVuesticUI) {
    logger.error(formatString(`Vuestic UI is not installed in the project. Run [${env.packageManager} install vuestic-ui].`), {
      timestamp: true,
    })
    return []
  }

  const plugins = [] as Plugin[]

  plugins.push(...vuesticTsConfig())

  if (options.devtools !== false) {
    logger.info(formatString('Using [vuestic:devtools] plugin.'), {
      timestamp: true,
    })
    plugins.push(devtools(extractOptions('devtools')))
  }

  if (options.cssLayers !== false || env.hasTailwindCSS) {
    if (env.hasTailwindCSS) {
      logger.info(formatString('Using [vuestic:css-layers] plugin, because Tailwind CSS is detected.'), {
        timestamp: true,
      })
    } else {
      logger.info(formatString('Using [vuestic:css-layers] plugin.'), {
        timestamp: true,
      })
    }
    plugins.push(cssLayers)
  }

  if (Boolean(options.autoImport)) {
    logger.info(formatString('Using [vuestic:auto-import] plugin.'), {
      timestamp: true,
    })
    plugins.push(...vuesticAutoImport())
  }

  if (Boolean(options.config)) {
    logger.info(formatString('Using [vuestic:config] plugin.'), {
      timestamp: true,
    })
    plugins.push(...vuesticConfig(extractOptions('config')))
  }

  return plugins
}
