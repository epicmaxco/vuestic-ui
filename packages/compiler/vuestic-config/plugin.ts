import { Plugin } from 'vite'
import { configResolver } from './plugins/config-resolver'
import { useConfig } from './plugins/use-config'
import { configTypes } from './plugins/config-types'

export type Options = {
  configPath?: string
}

/** Add css layers to Vuestic files */
export const vuesticConfig =  (options: Options = {}): Plugin[] => {
  return [
    configTypes(options),
    configResolver(options),
    useConfig(options),
  ]
}
