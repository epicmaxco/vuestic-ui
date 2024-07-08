import { Plugin } from "vite"
import { devtools, PluginOptions as DevtoolsPluginOptions } from "../devtools"
import { cssLayers } from "../css-layers"

type Options = {
  /** @default true */
  devtools?: boolean | DevtoolsPluginOptions,

  /**
   * Adds CSS layers to Vuestic UI
   * Helps control the order of CSS in the final bundle
   *
   * @default true
   *
   * Add `vuestic.components` and `vuestic.styles` CSS layers
   */
  cssLayers?: boolean,
}

export const vuestic = (options: Options): Plugin[] => {
  const extractOptions = (key: keyof Options) => {
    // Build fails without as Record<string, string> cast
    return typeof options[key] === 'object' ? options[key] as Record<string, string> : undefined
  }

  const plugins = []

  if (options.devtools !== false) {
    plugins.push(devtools(extractOptions('devtools')))
  }

  if (options.cssLayers !== false) {
    plugins.push(cssLayers)
  }

  return plugins
}
