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
   * @default false
   *
   * Add `vuestic.components` and `vuestic.styles` CSS layers
   *
   * @notice This will make Vuestic styles less important. Make sure you don't have any global conflicting styles.
   * For example. tailwind have normalize css included. It may have higher priority than Vuestic styles and components might look broken.
   */
  cssLayers?: boolean,
}

export const vuestic = (options: Options = {}): Plugin[] => {
  const extractOptions = (key: keyof Options) => {
    // Build fails without as Record<string, string> cast
    return typeof options[key] === 'object' ? options[key] as Record<string, string> : undefined
  }

  const plugins = []

  if (options.devtools !== false) {
    console.log('Using vuestic:devtools') // TODO: Remove this log
    plugins.push(devtools(extractOptions('devtools')))
  }

  if (options.cssLayers === true) {
    console.log('Using vuestic:css-layers') // TODO: Remove this log
    plugins.push(cssLayers)
  }

  return plugins
}
