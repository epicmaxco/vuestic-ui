import { Plugin } from 'vite'
import { resolveVuesticConfigPath} from './config-resolver'
import { writeFile, mkdir } from 'fs/promises'
import { resolve } from 'path'

const generateConfigTypes = (configPath: string) => {
  return `
import type config from '${configPath}';
import type { PartialGlobalConfig, IconConfiguration } from 'vuestic-ui';

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
  `
}

const typeModule = (configPath?: string) => {
  const config = configPath ? generateConfigTypes(configPath) : ''

  return `
import * as Vue from 'vue'
${config}

declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface GlobalComponents extends VuesticComponents {}
}
`.trim()
}

const vuesticConfig = () => {
  return `
import { defineVuesticConfig } from "vuestic-ui";

export default defineVuesticConfig({

})
  `.trim()
}

const indexTs = () => {
  return `
export * from './components'
export * from './config'
  `
}

/** Generate TS types for colors, icons and i18n messages from `vuestic.config.ts` */
export const configTypes =  (options: {
  configPath?: string
} = {}): Plugin => {

  return {
    name: 'vuestic:config-types',

    async buildStart() {
      let configPath = options.configPath || resolveVuesticConfigPath()

      configPath = configPath ? resolve(configPath) : configPath

      const module = typeModule(configPath)

      await mkdir('node_modules/.vuestic', { recursive: true })

      await Promise.all([
        writeFile('node_modules/.vuestic/index.d.ts', indexTs(), {
          encoding: 'utf-8',
          flag: 'w',
        }),
        writeFile('node_modules/.vuestic/config.d.ts', module, {
          encoding: 'utf-8',
          flag: 'w',
        }),
      ])
    },
  }
}
