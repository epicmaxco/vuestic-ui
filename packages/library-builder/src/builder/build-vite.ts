import { UserConfig } from 'vite';
import { build as viteBuild } from 'vite'

const globalConsole = global.console
const warn = globalConsole.warn
globalConsole.warn = (msg, ...args) => {
  // suppress @vue/reactivity-transform warning
  if (msg.includes('@vue/reactivity-transform')) return
  if (msg.includes('Generated an empty chunk')) return
  if (msg.includes('Browserslist: caniuse-lite is outdated. Please run')) return
  warn.call(globalConsole, msg, ...args)
}

export const buildVite = async (config: UserConfig) => {
  config.logLevel = 'silent'
  const result = await viteBuild(config)
  return result
}
