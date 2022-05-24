import { App, ComponentCustomProperties } from 'vue'

/** Type safe return app global properties for assign */
export const extractGlobalProperties = (app: App) => app.config.globalProperties as ComponentCustomProperties

/**
 * Type safe set vue global property
 * Declare type before use this method.
 * ```
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $vaThing: ThingType
  }
}
 * ```
 * @example See `global-config` or `color-config` for example
 */
export const defineGlobalProperty = <Key extends keyof ComponentCustomProperties, Value extends ComponentCustomProperties[Key]>(app: App, key: Key, v: Value) => {
  const globalProperties = extractGlobalProperties(app)
  globalProperties[key] = v
}

/** Type safe return vue global property */
export const getGlobalProperty = <Key extends keyof ComponentCustomProperties>(app: App, key: Key): ComponentCustomProperties[Key] => {
  return extractGlobalProperties(app)[key]
}
