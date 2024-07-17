import { Plugin } from 'vite'
import { resolveVuesticConfigPath} from './config-resolver'
import { writeFile, mkdir } from 'fs/promises'
import { resolve } from 'path'

const typeModule = (configPath: string) => {
  return `
import config from '${configPath}';
import { PartialGlobalConfig, type IconConfiguration } from 'vuestic-ui';

type ExtractColorNames<T extends PartialGlobalConfig> = T['colors'] extends { variables: infer U } ? keyof U : never
type ExtractIconNames<T extends PartialGlobalConfig> = T['icons'] extends IconConfiguration<infer U>[] ? U : never
type ExtractI18nKeys<T extends PartialGlobalConfig> = keyof T['i18n']


type Config = typeof config

type ColorNames = ExtractColorNames<Config>

declare module 'vuestic-ui' {
  export interface CustomColorVariables extends Record<ColorNames, string> {}
}

type IconNames = ExtractIconNames<Config>

declare module 'vuestic-ui' {
  export interface CustomIconVariables extends Record<IconNames, string> {}
}

type I18nKeys = ExtractI18nKeys<Config>

declare module 'vuestic-ui' {
  export interface CustomI18NKeys extends Record<I18nKeys, string> {}
}
`.trim()
}

/** Generate TS types for colors, icons and i18n messages from `vuestic.config.ts` */
export const configTypes =  (options: {
  configPath?: string
} = {}): Plugin => {

  return {
    name: 'vuestic:config-types',

    async buildStart() {
      let configPath = options.configPath || resolveVuesticConfigPath()

      if (!configPath) {
        return
      }

      configPath = resolve(configPath)

      const module = typeModule(configPath)

      await mkdir('node_modules/.vuestic', { recursive: true })

      await writeFile('node_modules/.vuestic/config.d.ts', module, {
        encoding: 'utf-8',
        flag: 'w',
      })
    },
  }
}
