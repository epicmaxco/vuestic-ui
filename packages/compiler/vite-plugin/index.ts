import { Plugin } from "vite"
import { devtools, PluginOptions as DevtoolsPluginOptions } from "../devtools"

type Options = {
  /** @default true */
  devtools?: boolean | DevtoolsPluginOptions
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

  return plugins
}
